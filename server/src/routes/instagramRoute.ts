import express from 'express';
import { auth } from '../middleware/auth';
import { check, validationResult } from 'express-validator';

import Creator from '../models/Creator';
import InstagramData from '../models/InstagramData';

const router = express.Router();

router.post('/', async (req, res) => {
        try {
            const {
                creatorID,
                pageID,
                businessID,
                name,
                userName,
                profilePicURL
            } = req.body;

            const basicUser = new InstagramData({
                creatorID,
                pageID,
                businessID,
                name,
                userName,
                profilePicURL
            });

            await basicUser.save();

            return res.json(basicUser);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('Server Error');
        }
    }
);



export default router;
