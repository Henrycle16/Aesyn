import express from "express";
import { validationResult } from "express-validator";

import Brand from "../models/Brand";
import User from "../models/User";

const router = express.Router();

// @route   GET api/brands/me
// @desc    Get current users profile
// @access  Private
router.get("/me", async (req, res) => {
  try {
    const profile = await Brand.findOne({
      user: req.body.user.id,
    }).populate("user", ["username", "firstName", "lastName", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/brands/
// @desc    Create Brand profile
// @access  Private
router.post(
  "/",
  [
    // ** EXPRESS-VALIDATION CHECKS HERE
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyName, industry, location, preferences } = req.body;

    //Build profile object
    const brandFields = {
      user: req.body.user.id,
      companyName: companyName,
      industry: industry,
      location: location,
      preferences: preferences,
    };

    console.log("INSIDE BRAND ROUTE!");

    try {
      let brandProfile = await Brand.findOne({ user: req.body.user.id });

      //If found error
      // if (brandProfile) {
      //   return res.status(400).json({
      //     errors: [{ msg: "Brand already exists" }],
      //   });
      // }

      //Create if not found
      brandProfile = new Brand(brandFields);

      await brandProfile.save();
      res.json(brandProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/brands/
// @desc    Update Brand profile
// @access  Private
router.put("/", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, industry, preferences } = req.body;

  //Build profile object
  const brandFields = {
    user: req.body.user.id,
    companyName: companyName,
    industry: industry,
    preferences: preferences,
  };

  try {
    let brandProfile = await Brand.findOne({ user: req.body.user.id });

    //Update if found
    if (brandProfile) {
      brandProfile = await Brand.findOneAndUpdate(
        { user: req.body.user.id },
        { $set: brandFields },
        { new: true }
      );

      return res.json(brandProfile);
    } else {
      return res.status(400).json({
        errors: [{ msg: "No Brand profile found" }],
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/brands/
// @desc    Get all Brand profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Brand.find().populate("user", [
      "username",
      "firstName",
      "lastName",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/brands/user/:user_id
// @desc    Get Brand profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Brand.findOne({
      user: req.params.user_id,
    }).populate("user", ["username", "firstName", "lastName", "avatar"]);

    if (profile) {
      return res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// @route   DELETE api/brands
// @desc    Delete profile, user, & posts
// @access  Private
router.delete("/", async (req, res) => {
  try {
    // Remove user posts
    //await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Brand.findOneAndDelete({ user: req.body.user.id });
    // Remove user
    await User.findOneAndDelete({ _id: req.body.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/brands/query
// @desc    Brand query input
// @access  Private
// router.post("/query", async (req, res) => {
//   try {
//     const context = await getContext(req.body.query);
//     const ids = context.map((item) => item.id);
//     const users = await User.find({
//       _id: { $in: ids },
//     });

//     const suggestedUsers = getResponse(req.body.query, users);

//     res.status(201).json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

export default router;
