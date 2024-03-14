import express from 'express';
import { auth } from '../middleware/auth';
import { check, validationResult } from 'express-validator';

import Creator from '../models/Creator';
import User from '../models/User';

const router = express.Router();

// @route   GET api/creatorProfile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Creator.findOne({
            user: req.user.id,
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

// @route   POST api/creatorProfile
// @desc    Create user profile
// @access  Private
router.post(
    '/',
    [
        auth
    ],
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
            user: req.user.id,
            socialMedias: socialMedias,
            category: category,
            location: {
                city: location.city,
                country: location.country
            },
            bio: bio
        };

        try {
            let creatorProfile = await Creator.findOne({ user: req.user.id });

            //Update if found
            if (creatorProfile) {
                creatorProfile = await Creator.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: creatorProfileFields},
                    { new: true }
                );

                return res.json(creatorProfile);
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

// @route   PUT api/creatorProfile
// @desc    Update user profile     **GOT TO FLESH OUT LATER**
// @access  Private
router.put(
    '/',
    [
        auth
    ],
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
            user: req.user.id,
            socialMedias: socialMedias,
            category: category,
            location: {
                city: location.city,
                country: location.country
            },
            bio: bio
        };

        try {
            let creatorProfile = await Creator.findOne({ user: req.user.id });

            //Update if found
            if (creatorProfile) {
                creatorProfile = await Creator.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: creatorProfileFields},
                    { new: true }
                );

                return res.json(creatorProfile);
            }

            await creatorProfile.save();
            res.json(creatorProfile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/profile
// @desc    Get all profiles
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

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
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

// @route   DELETE api/profile
// @desc    Delete profile, user, & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        //await Post.deleteMany({ user: req.user.id });
        // Remove profile
        await Creator.findOneAndDelete({ user: req.user.id });
        // Remove user
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
