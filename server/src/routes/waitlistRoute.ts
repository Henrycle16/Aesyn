import express, { Request, Response } from "express";
import Waitlist from "../models/Waitlist";

const router = express.Router();

// Get all waitlist applicants
router.get("/", async (req: Request, res: Response) => {
  try {
    const waitlist = await Waitlist.find({});
    res.status(200).json(waitlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get applicant by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const waitlist = await Waitlist.findOne({ _id: req.params.id });
    res.status(200).json(waitlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create applicant
router.post("/", async (req: Request, res: Response) => {
  try {
    const newApplicant = new Waitlist(req.body);
    const savedApplicant = await newApplicant.save();

    res.status(201).json(savedApplicant);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;