import express, { Request, Response } from 'express';
import { getContext } from "../lib/queryResponse";
import User from '../models/User';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {  
    try {
      const context = await getContext(req.body.query);
      const newArr = [];

      for(let i = 0; i < context.length; i++) {
        const user = await User.findById(context[i].id);
        newArr.push(user);
      }

      res.status(201).json(newArr);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

export default router;