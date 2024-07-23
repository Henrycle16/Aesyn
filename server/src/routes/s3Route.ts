import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import Creator from "../models/Creator";

dotenv.config();


// Function to generate a random image name using crypto for uniqueness
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

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
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  const imageName = randomImageName();
  const params = {
    // Set up parameters for S3 upload
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageName}`;
    console.log("Image URL:", imageUrl);
    console.log("User ID for update:", userId);

    console.log("Type of userId:", typeof userId);
    console.log("Value of userId:", userId);
  
    // Update the creator document in the database with the new avatar URL
    const updatedCreator = await Creator.findOneAndUpdate(
      { user: userId },
      { $set: { avatar: imageUrl } },
      { new: true }
    );

    if (!updatedCreator) {
      console.error("No creator found with the provided userId:", userId);
      return res.status(404).send({ message: "Creator not found" });
    }

    res.send({ message: "Avatar updated successfully", data: updatedCreator });
  } catch (error) {
    console.error("Error uploading to S3 or updating the database:", error);
    res.status(500).send({ message: "Failed to update avatar", error: error.message });
  }
});

export default router;
