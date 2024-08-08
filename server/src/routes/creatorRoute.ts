import express from "express";
// import { check } from 'express-validator';
import { validationResult } from "express-validator";

import Creator from "../models/Creator";
import User from "../models/User";

const router = express.Router();

// @route   GET api/creators/me
// @desc    Get current users Creator profile
// @access  Private
router.get("/me", async (req, res) => {
  try {
    console.log("PARAMS: ", req.query.userId);
    const profile = await Creator.findOne({
      user: req.query.userId,
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

// @route   POST api/creators
// @desc    Create Creator profile
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

    const { userName, gender, location, preferences, interests } = req.body;

    //Build profile object
    const creatorProfileFields = {
      user: req.body.user.id,
      userName: userName,
      gender: gender,
      location: location,
      preferences: preferences,
      interests: interests,
    };

    try {
      let creatorProfile = await Creator.findOne({ user: req.body.user.id });

      // If found error
      // ** Comment out below to test without having to delete **
      if (creatorProfile) {
        return res.status(400).json({
          errors: [{ msg: "Creator already exists" }],
        });
      }

      //Create if not found
      creatorProfile = new Creator(creatorProfileFields);

      await creatorProfile.save();
      res.json(creatorProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/creators/:user_id
// @desc    Update Creator profile     **GOT TO FLESH OUT**
// @access  Private
router.put("/:user_id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, preferences, interests, location, bio } = req.body;

  //Build profile object
  const creatorProfileFields = {
    user: req.params.user_id,
    userName: userName,
    preferences: preferences,
    interests: interests,
    bio: bio,
    location: {
      city: location.city,
      country: location.country,
    },
  };

  try {
    //Update if found
    const updatedCreator = await Creator.findOneAndUpdate(
      { user: req.params.user_id },
      { $set: { creatorProfileFields } },
      { new: true, runValidators: true }
    );

    // Check if the creator was found and updated
    if (!updatedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PATCH api/creators/myaccount/:user_id
// @desc    Update Creator profile
// @access  Private
router.patch("/myaccount/:user_id", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  interface LooseObject {
    [key: string]: any
  }

  const personalInformationFields: LooseObject = {}
  //Build profile object
  for (const [key, value] of Object.entries(req.body)) {
    if(value !== '') {
      personalInformationFields[key] = value
    }
  }
  
  try {
    const userId = req.params.user_id;
    //Update if found
    const updatedCreator = await Creator.findOneAndUpdate(
      { user: userId },
      { $set: personalInformationFields },
      { new: true }
    );

    // Check if the creator was found and updated
    if (!updatedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }
    res.json(updatedCreator)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/creators
// @desc    Get all Creator profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Creator.find().populate("user", [
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

// @route   GET api/creators/user/:user_id
// @desc    Get Creator profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    console.log("here");
    const profile = await Creator.findOne({
      user: req.params.user_id,
    }).populate("user", ["username", "firstName", "lastName", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    //console.error(err.message);
    //if (err.kind == 'ObjectId') {
    //    return res.status(400).json({ msg: 'Profile not found' });
    //}
    //res.status(500).send('Server Error');
  }
});

// @route   Get api/creators
// @desc    check if username exist
// @access  Public -> Private
router.get("/username/:username", async (req, res) => {
  try {
    const creator = await Creator.findOne({
      userName: req.params.username,
    }).populate("user", ["firstName", "lastName", "avatar", "email"]);
    console.log(creator);
    res.status(200).json(creator);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   DELETE api/creators
// @desc    Delete Creators profile, user, & posts
// @access  Private
router.delete("/", async (req, res) => {
  try {
    // Remove user posts
    //await Post.deleteMany({ user: req.body.user.id });
    // Remove profile
    await Creator.findOneAndDelete({ user: req.body.user.id });
    // Remove user
    await User.findOneAndDelete({ _id: req.body.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* =====Profile Card Endpoints===== */

// Update Interests - api/creators/:user_id/interests
router.put("/:user_id/interests", async (req, res) => {
  try {
    const { interests } = req.body;

    // Ensure interests is an array of strings
    if (!Array.isArray(interests) || !interests.every(interests => typeof interests === 'string')) {
      return res.status(400).json({ msg: "Interests must be an array of strings" });
    }

    const updatedCreator = await Creator.findOneAndUpdate(
      { user: req.params.user_id },
      { $set: { interests } },
      { new: true }
    );

    // Check if the creator was found and updated
    if (!updatedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }

    res.status(200).json(updatedCreator.interests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Bio - api/creators/:user_id/bio
router.put("/:user_id/bio", async (req, res) => {
  try {
    const { bio } = req.body;

    const updatedCreator = await Creator.findOneAndUpdate(
      { user: req.params.user_id },
      { $set: { bio: bio } },
      { new: true, runValidators: true }
    );

    // Check if the creator was found and updated
    if (!updatedCreator) {
      return res.status(404).json({ msg: "Creator not found" });
    }

    res.status(200).json(updatedCreator.bio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* =====Package Endpoints===== */

// CREATE package to creator.packages - api/creators/:user_id/packages
router.post("/:user_id/packages", async (req, res) => {
  try {
    const creatorProfile = await Creator.findOneAndUpdate(
      { user: req.params.user_id },
      { $push: { packages: req.body } },
      {
        new: true,
        runValidators: true,
      }
    );
    const newPackage =
      creatorProfile.packages[creatorProfile.packages.length - 1];
    res.status(200).json(newPackage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// UPDATE a package - api/creators/:user_id/packages
router.put("/:user_id/packages", async (req, res) => {
  try {
    const updatedPackage = req.body;

    const creatorProfile = await Creator.findOneAndUpdate(
      { user: req.params.user_id, "packages._id": updatedPackage._id },
      { $set: { "packages.$": updatedPackage } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(creatorProfile.packages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// DELETE a package - api/creators/:user_id/packages/:package_id
router.delete("/:user_id/packages/:package_id", async (req, res) => {
  try {
    const creatorProfile = await Creator.updateOne(
      { user: req.params.user_id, "packages._id": req.params.package_id },
      { $pull: { packages: { _id: req.params.package_id } } }
    );

    res.status(200).json(creatorProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

export default router;