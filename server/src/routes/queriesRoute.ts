import express, { Request, Response } from 'express';
import { getContext } from "../lib/queryResponse";
import User from '../models/User';
import { getResponse } from '../lib/chatModel';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {  
    try {
      const context = await getContext(req.body.query);
      const ids = context.map(item => item.id);
      const users = await User.find({
        _id: { $in: ids }
      });

      const suggestedUsers = getResponse(req.body.query, users);

      res.status(201).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

export default router;