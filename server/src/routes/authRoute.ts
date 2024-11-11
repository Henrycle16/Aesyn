import express from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import User from '../models/User';

const router = express.Router();

// @route   POST api/auth
// @desc    Authenticate user. User Login
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // See if user exists
            const user = await User.findOne({ email });
            // console.log(user);
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid Credentials' }],
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            // console.log(isMatch);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid Credentials' }],
                });
            }

            // console.log('Authenticated User');
            return res.status(201).json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server error');
        }
    }
);

export default router;
