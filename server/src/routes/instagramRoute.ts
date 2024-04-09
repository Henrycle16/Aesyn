import express from 'express';
import InstagramData from '../models/InstagramData';
import { instagramUserCheck, instagramInsights } from '../lib/instagram/instagramCheck';

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
            res.json(basicUser);
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
        // Find the user with the given businessId
        const user = await InstagramData.findOne({ businessID: businessID });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Get the accessToken from the user
        const { longLivedAccessToken: accessToken } = user;

        const userInsights = await instagramInsights(businessID, accessToken);

        if (userInsights) {
            // Update the user with the insights
            user.insights = userInsights;
            const updatedUser = await user.save();

            res.json(updatedUser);
        } else {
            res.status(200).send('No insights available');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


export default router;
