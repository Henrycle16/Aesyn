import express from 'express';
import InstagramData from '../models/InstagramData';
import { instagramUserCheck, getInsights } from '../lib/instagram/instagramCheck';

const router = express.Router();

router.post('/', async (req, res) => {
        try {

            return;
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('Server Error');
        }
    }
);


router.post('/check', async (req, res) => {
    const { accessToken } = req.body;
    try {
        const userPayload = await instagramUserCheck(accessToken);

        if (userPayload) {
            const basicUser = new InstagramData(userPayload);
            await basicUser.save();

            const insights = await getInsights(basicUser.businessID);
            res.json({ user: basicUser, insights: insights });
        } else {
            res.status(200).send('User already exists');
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/insights', async (req, res) => {
    // BusinessID must be passed in the request body
    const { businessID } = req.body;
    try {
        const insights = await getInsights(businessID);
        res.json(insights);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


export default router;
