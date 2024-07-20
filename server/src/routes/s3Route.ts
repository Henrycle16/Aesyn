import express from "express";
import multer from "multer";
import auth from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

upload.single("portfolio");

router.get("/api/posts", auth, async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.send("S3 route");
});
