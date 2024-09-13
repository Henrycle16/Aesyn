"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// @route   GET api/users/
// @desc    Get all users
// @access  Public -> Private
router.get("/", async (req, res) => {
    try {
        const allUsers = await User_1.default.find({});
        res.status(200).json(allUsers);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// @route   Get api/email
// @desc    check if email exist
// @access  Public -> Private
router.get("/email/:email", async (req, res) => {
    try {
        const email = await User_1.default.findOne({ email: req.params.email });
        console.log(email);
        res.status(200).json(email);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// @route   Get api/users/:id
// @desc    Get user by ID
// @access  Public -> Private
router.get("/:id", async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", [
    (0, express_validator_1.check)("firstName", "firstName is required").not().isEmpty(),
    (0, express_validator_1.check)("lastName", "lastName is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please include a valid email").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, username, email, password, avatar, userType, description, promotional, acceptedTerms, } = req.body;
    try {
        // Check to see if user exists
        const user = await User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [{ msg: "User already exists" }],
            });
        }
        const newUser = new User_1.default({
            firstName,
            lastName,
            username,
            email,
            password,
            avatar,
            userType,
            description,
            promotional,
            acceptedTerms,
        });
        // Encrypt password
        const salt = await bcryptjs_1.default.genSalt(10);
        newUser.password = await bcryptjs_1.default.hash(password, salt);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// @route   PUT api/users
// @desc    Update self user
// @access  Private
router.put("/:user_id", async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId = req.params.user_id;
        const updateData = req.body;
        await User_1.default.findByIdAndUpdate(userId, {
            $set: updateData,
        });
        const userUpdated = await User_1.default.findById(userId);
        res.status(201).json(userUpdated);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// @route   PATCH api/users/email/:user_id
// @desc    Update self user email
// @access  Private
router.patch("/email/:user_id", async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId = req.params.user_id;
        const updatedUser = await User_1.default.findOneAndUpdate({ _id: userId }, { $set: req.body }, { new: true });
        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(201).json(updatedUser);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// @route   PATCH api/users/password/:user_id
// @desc    Update self user password
// @access  Private
router.patch("/password/:user_id", async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { password } = req.body;
    try {
        const userId = req.params.user_id;
        // Encrypt password
        const salt = await bcryptjs_1.default.genSalt(10);
        const value = await bcryptjs_1.default.hash(password, salt);
        const obj = { password: value };
        const updatedUser = await User_1.default.findOneAndUpdate({ _id: userId }, { $set: obj }, { new: true });
        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(201).json(updatedUser);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// @route   DELETE api/users
// @desc    Delete user from database.
// @access  Private
router.delete("/", async (req, res) => {
    try {
        await User_1.default.findOneAndDelete({ _id: req.body.user.id });
        res.status(200).json("Account has been deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map