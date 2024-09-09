import express from "express";
import InstagramData from "../models/InstagramDatav2";
import {
  instagramUserCheck,
  getInsights,
} from "../lib/instagram/instagramCheck";

const router = express.Router();

router.get("/creator/:creatorId", async (req, res) => {
  try {
    const creatorId = req.params.creatorId;
    const creator = await InstagramData.findOne({ creatorID: creatorId });
    console.log(creator);
    return res.status(200).json(creator);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/check/:creatorId", async (req, res) => {
  const { creatorId } = req.params;
  const { accessToken } = req.body;
  try {
    const userPayload = await instagramUserCheck(accessToken, creatorId);

    if (userPayload) {
      const basicUser = new InstagramData(userPayload);
      await basicUser.save();

      const insights = await getInsights(basicUser.businessID);
      res.json({ user: basicUser, insights: insights });
    } else {
      res.status(200).send("User already exists");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/insights", async (req, res) => {
  // BusinessID must be passed in the request body
  const { businessID } = req.body;
  try {
    const insights = await getInsights(businessID);
    res.json(insights);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

export default router;
