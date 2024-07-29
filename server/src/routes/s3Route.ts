import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

interface MulterFiles {
  uri?: Express.Multer.File[];
  thumbnailUri?: Express.Multer.File[];
}

// Define POST route for adding user content to portfolio
router.post("/:user_id/portfolio", upload.fields([{ name: 'uri' }, { name: 'thumbnailUri' }]), async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request files:', req.files);
  
  if(req.body.mediaType === "video"){
    try {
      const creator = await Creator.findOne({ user: req.params.user_id });
      if (!creator) {
        return res.status(404).send({ message: "Creator not found" });
      }
      const updatedCreator = await Creator.findOneAndUpdate(
        { user: req.params.user_id  },
        { $push: { portfolio: { ...req.body } } },
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

  console.log('File:', file);
  console.log('Thumbnail file:', thumbnailFile);

  let folderPath = "creator/portfolio/personal/";

  if(req.body.contentType === "campaign"){
    folderPath = "creator/portfolio/campaign/";
  }

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

    res.send({ message: "Content updated successfully", data: updatedCreator });
  } catch (error) {
    console.error("Error uploading to S3 or updating the database:", error);
    res.status(500).send({ message: "Failed to update portfolio content", error: error.message });
  }
});


export default router;
