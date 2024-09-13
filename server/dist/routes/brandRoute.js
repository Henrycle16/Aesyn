"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const Brand_1 = __importDefault(require("../models/Brand"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// @route   GET api/brands/me
// @desc    Get current users profile
// @access  Private
router.get("/me", async (req, res) => {
    try {
        const profile = await Brand_1.default.findOne({
            user: req.body.user.id,
        }).populate("user", ["username", "firstName", "lastName", "avatar"]);
        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// @route   POST api/brands/
// @desc    Create Brand profile
// @access  Private
router.post("/", [
// ** EXPRESS-VALIDATION CHECKS HERE
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
        let brandProfile = await Brand_1.default.findOne({ user: req.body.user.id });
        //If found error
        // if (brandProfile) {
        //   return res.status(400).json({
        //     errors: [{ msg: "Brand already exists" }],
        //   });
        // }
        //Create if not found
        brandProfile = new Brand_1.default(brandFields);
        await brandProfile.save();
        res.json(brandProfile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// @route   PUT api/brands/
// @desc    Update Brand profile
// @access  Private
router.put("/", [], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
        let brandProfile = await Brand_1.default.findOne({ user: req.body.user.id });
        //Update if found
        if (brandProfile) {
            brandProfile = await Brand_1.default.findOneAndUpdate({ user: req.body.user.id }, { $set: brandFields }, { new: true });
            return res.json(brandProfile);
        }
        else {
            return res.status(400).json({
                errors: [{ msg: "No Brand profile found" }],
            });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// @route   GET api/brands/
// @desc    Get all Brand profiles
// @access  Public
router.get("/", async (req, res) => {
    try {
        const profiles = await Brand_1.default.find().populate("user", [
            "username",
            "firstName",
            "lastName",
            "avatar",
        ]);
        res.json(profiles);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// @route   GET api/brands/user/:user_id
// @desc    Get Brand profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Brand_1.default.findOne({
            user: req.params.user_id,
        }).populate("user", ["username", "firstName", "lastName", "avatar"]);
        if (profile) {
            return res.json(profile);
        }
    }
    catch (err) {
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
        await Brand_1.default.findOneAndDelete({ user: req.body.user.id });
        // Remove user
        await User_1.default.findOneAndDelete({ _id: req.body.user.id });
        res.json({ msg: "User deleted" });
    }
    catch (err) {
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
exports.default = router;
//# sourceMappingURL=brandRoute.js.map