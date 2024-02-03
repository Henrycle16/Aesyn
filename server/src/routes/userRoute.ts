import express, { Request, Response } from 'express';
import User from '../models/userModel';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { firstName, lastName, description } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    description,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

export default router;