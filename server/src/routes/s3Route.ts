import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import Creator from "../models/Creator";

dotenv.config();

// Retrieve AWS S3 bucket details and credentials from environment variables
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Initialize S3 client with credentials and region
const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region: bucketRegion,
});

// Configure multer for memory storage (files will be stored in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// Define PUT route for updating user avatar
router.put("/:user_id/avatar", upload.single("avatar"), async (req, res) => {
  const file = req.file 

  if (!file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const folderPath = "creator/avatar/";
  // using the user ID as the key to replace current avatar
  const fullKey = `${folderPath}${req.params.user_id}`;

  const params = {
    // Set up parameters for S3 upload
    Bucket: bucketName,
    Key: fullKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    //Fetch the creator document from the database
    const creator = await Creator.findOne({ user: req.params.user_id });
    if (!creator) {
      return res.status(404).send({ message: "Creator not found" });
    }

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fullKey}`;

    // Update the creator document in the database with the new avatar URL
    const updatedCreator = await Creator.findOneAndUpdate(
      { user: req.params.user_id  },
      { $set: { avatar: imageUrl } },
      { new: true }
    );

    res.send({ message: "Avatar updated successfully", data: updatedCreator });
  } catch (error) {
    console.error("Error uploading to S3 or updating the database:", error);
    res.status(500).send({ message: "Failed to update avatar", error: error.message });
  }
});


// PORTFOLIO ROUTES //
interface MulterFiles {
  uri?: Express.Multer.File[];
  thumbnailUri?: Express.Multer.File[];
}

// POST route for uploading portfolio content
router.post("/:user_id/portfolio", upload.fields([{ name: 'uri' }, { name: 'thumbnailUri' }]), async (req, res) => {
  if(req.body.mediaType === "video"){
    try {
      const creator = await Creator.findOne({ user: req.params.user_id });
      if (!creator) {
        return res.status(404).send({ message: "Creator not found" });
      }
      const updatedCreator = await Creator.findOneAndUpdate(
        { user: req.params.user_id  },
        { $push: { portfolio: { ...req.body, date: new Date() } } },
        { new: true }
      );

      return res.send({ message: "Content updated successfully", data: updatedCreator });;
    } catch (error) {
      console.error("Error uploading to S3 or updating the database:", error);
      
      return res.status(500).send({ message: "Failed to update portfolio content", error: error.message });;
    }
  }

  const files = req.files as MulterFiles;
  const file = files.uri?.[0];
  const thumbnailFile = files.thumbnailUri?.[0];

  const folderPath = req.body.contentType === "campaign" ? "creator/portfolio/campaign/" : "creator/portfolio/personal/";

  const fullKey = `${folderPath}${req.params.user_id}-${req.body.name}`;
  const thumbnailFullKey = `${folderPath}${req.params.user_id}-thumbnail-${req.body.name}`;

  const uriParams = {
    Bucket: bucketName,
    Key: fullKey,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  };

  const thumbnailParams = {
    Bucket: bucketName,
    Key: thumbnailFullKey,
    Body: thumbnailFile?.buffer,
    ContentType: thumbnailFile?.mimetype,
  };

  try {
    const creator = await Creator.findOne({ user: req.params.user_id });
    if (!creator) {
      return res.status(404).send({ message: "Creator not found" });
    }

    const uriCommand = new PutObjectCommand(uriParams);
    await s3.send(uriCommand);

    const imageUri = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fullKey}`;

    const thumbnailUriCommand = new PutObjectCommand(thumbnailParams);
    await s3.send(thumbnailUriCommand);

    const thumbnailUri = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${thumbnailFullKey}`;

    const updatedCreator = await Creator.findOneAndUpdate(
      { user: req.params.user_id  },
      { $push: { portfolio: { ...req.body, uri: imageUri, thumbnailUri: thumbnailUri} } },
      { new: true }
    );

    res.send({ message: "Content uploaded successfully", data: updatedCreator });
  } catch (error) {
    console.error("Error uploading to S3 or updating the database:", error);
    res.status(500).send({ message: "Failed to upload portfolio content", error: error.message });
  }
});

// DELETE route for deleting portfolio content
router.delete("/:user_id/portfolio/:content_id", async (req, res) => {
  try {
    const { user_id, content_id } = req.params;

    const creator = await Creator.findOne({ user: user_id });
    if (!creator) {
      return res.status(404).send({ message: "Creator not found" });
    }

    const content = creator.portfolio.id(content_id);
    if (!content) {
      return res.status(404).send({ message: "Content not found" });
    }

    if (req.body.mediaType === "video") {
      await Creator.updateOne(
        { user: user_id },
        { $pull: { portfolio: { _id: content_id } } }
      );
    } else {
      const deleteParams = {
        Bucket: bucketName,
        Key: content.uri.split(`https://${bucketName}.s3.${bucketRegion}.amazonaws.com/`)[1],
      };

      const deleteThumbnailParams = {
        Bucket: bucketName,
        Key: content.thumbnailUri.split(`https://${bucketName}.s3.${bucketRegion}.amazonaws.com/`)[1],
      };

      const deleteCommand = new DeleteObjectCommand(deleteParams);
      const deleteThumbnailCommand = new DeleteObjectCommand(deleteThumbnailParams);

      await s3.send(deleteCommand);
      await s3.send(deleteThumbnailCommand);

      await Creator.updateOne(
        { user: user_id },
        { $pull: { portfolio: { _id: content_id } } }
      );
    }

    res.status(200).send({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).send({ message: "Failed to delete content", error: error.message });
  }
});

// PUT route for updating portfolio content
router.put("/:user_id/portfolio/:content_id", upload.fields([{ name: 'uri' }, { name: 'thumbnailUri' }]), async (req, res) => {
  try {
    const { user_id, content_id } = req.params;

    const creator = await Creator.findOne({ user: user_id });
    if (!creator) {
      return res.status(404).send({ message: "Creator not found" });
    }

    const content = creator.portfolio.id(content_id);
    if (!content) {
      return res.status(404).send({ message: "Content not found" });
    }

    if (req.body.mediaType === "video") {
      content.set(req.body.data);
    } else {
      const files = req.files as MulterFiles;
      const file = files?.uri?.[0];
      const thumbnailFile = files?.thumbnailUri?.[0];

      // If a new file is uploaded, delete the old file from S3
      if (file) {
        if (content.uri) {
          const oldUriKey = content.uri.split('.amazonaws.com/')[1];
          const deleteOldUriCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: oldUriKey,
          });
          await s3.send(deleteOldUriCommand);
        }

        const folderPath = req.body.contentType === "campaign" ? "creator/portfolio/campaign/" : "creator/portfolio/personal/";
        const fullKey = `${folderPath}${user_id}-${req.body.name}`;
        const uriParams = {
          Bucket: bucketName,
          Key: fullKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uriCommand = new PutObjectCommand(uriParams);
        await s3.send(uriCommand);

        const imageUri = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fullKey}`;
        content.uri = imageUri;
      }

      // If a new thumbnail is uploaded, delete the old thumbnail from S3
      if (thumbnailFile) {
        if (content.thumbnailUri) {
          const oldThumbnailKey = content.thumbnailUri.split('.amazonaws.com/')[1];
          const deleteOldThumbnailCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: oldThumbnailKey,
          });
          await s3.send(deleteOldThumbnailCommand);
        }

        const folderPath = req.body.contentType === "campaign" ? "creator/portfolio/campaign/" : "creator/portfolio/personal/";
        const thumbnailFullKey = `${folderPath}${user_id}-thumbnail-${req.body.name}`;
        const thumbnailParams = {
          Bucket: bucketName,
          Key: thumbnailFullKey,
          Body: thumbnailFile.buffer,
          ContentType: thumbnailFile.mimetype,
        };

        const thumbnailUriCommand = new PutObjectCommand(thumbnailParams);
        await s3.send(thumbnailUriCommand);

        const thumbnailUri = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${thumbnailFullKey}`;
        content.thumbnailUri = thumbnailUri;
      }

      content.set(req.body.data);
    }
    
    content.set({ date: new Date() });
    await creator.save();
    res.send({ message: "Content updated successfully", data: content });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).send({ message: "Failed to update content", error: error.message });
  }
});

export default router;