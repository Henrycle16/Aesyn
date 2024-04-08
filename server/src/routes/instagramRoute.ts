import express from 'express';
import InstagramData from '../models/InstagramData';
import { instagramCheck } from '../lib/instagram/instagramCheck';

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
        const userPayload = await instagramCheck(accessToken);

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


export default router;
