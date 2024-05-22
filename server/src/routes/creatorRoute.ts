import express from 'express';
import { check, validationResult } from 'express-validator';

import Creator from '../models/Creator';
import User from '../models/User';
import auth from "../middleware/auth";

const router = express.Router();

// @route   GET api/creators/me
// @desc    Get current users Creator profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Creator.findOne({
            user: req.body.user.id,
        }).populate('user', [
            'username',
            'firstName', 
            'lastName',
            'avatar',
        ]);

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/creators
// @desc    Create Creator profile
// @access  Private
router.post(
    '/',
    [
        // ** EXPRESS-VALIDATION CHECKS HERE
    ],
    auth, 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            userName,
            gender,
            location,
            preferences,
            niche
        } = req.body;

        
        //Build profile object
        const creatorProfileFields = {
            user: req.body.user.id,
            userName: userName,
            gender: gender,
            location: location,
            preferences: preferences,
            niche: niche
        };

        try {
            let creatorProfile = await Creator.findOne({ user: req.body.user.id });

            // If found error
            // ** Comment out below to test without having to delete **
            if (creatorProfile) {
                return res.status(400).json({
                    errors: [{ msg: 'Creator already exists' }],
                  });
            }

            //Create if not found
            creatorProfile = new Creator(creatorProfileFields);

            await creatorProfile.save();
            res.json(creatorProfile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/creators
// @desc    Update Creator profile     **GOT TO FLESH OUT LATER**
// @access  Private
router.put(
    '/',
    [

    ], 
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            socialMedias,
            category,
            location,
            bio
        } = req.body;

        //Build profile object
        const creatorProfileFields = {
            user: req.body.user.id,
            socialMedias: socialMedias,
            category: category,
            location: {
                city: location.city,
                country: location.country
            },
            bio: bio
        };

        try {
            let creatorProfile = await Creator.findOne({ user: req.body.user.id });

            //Update if found
            if (creatorProfile) {
                creatorProfile = await Creator.findOneAndUpdate(
                    { user: req.body.user.id },
                    { $set: creatorProfileFields},
                    { new: true }
                );

                return res.json(creatorProfile);
            } else {
                return res.status(400).json({
                    errors: [{ msg: 'No Creator profile found' }],
                  });
            }

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/creators
// @desc    Get all Creator profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Creator.find().populate('user', [
            'username',
            'firstName', 
            'lastName',
            'avatar',
        ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/creators/user/:user_id
// @desc    Get Creator profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Creator.findOne({
            user: req.params.user_id,
        }).populate('user', [
            'username',
            'firstName', 
            'lastName',
            'avatar',
        ]);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/creators
// @desc    Delete Creators profile, user, & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        //await Post.deleteMany({ user: req.body.user.id });
        // Remove profile
        await Creator.findOneAndDelete({ user: req.body.user.id });
        // Remove user
        await User.findOneAndDelete({ _id: req.body.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
