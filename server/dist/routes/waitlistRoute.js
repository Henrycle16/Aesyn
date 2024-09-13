"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Waitlist_1 = __importDefault(require("../models/Waitlist"));
const router = express_1.default.Router();
// Get all waitlist applicants
router.get("/", async (req, res) => {
    try {
        const waitlist = await Waitlist_1.default.find({});
        res.status(200).json(waitlist);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// Get applicant by ID
router.get("/:id", async (req, res) => {
    try {
        const waitlist = await Waitlist_1.default.findOne({ _id: req.params.id });
        res.status(200).json(waitlist);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// Get applicant by email
router.get("/email/:email", async (req, res) => {
    try {
        const waitlist = await Waitlist_1.default.findOne({ email: req.params.email });
        res.status(200).json(waitlist);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// Create applicant
router.post("/", async (req, res) => {
    try {
        const newApplicant = new Waitlist_1.default(req.body);
        const savedApplicant = await newApplicant.save();
        res.status(201).json(savedApplicant);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=waitlistRoute.js.map