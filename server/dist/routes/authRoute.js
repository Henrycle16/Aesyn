"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// @route   POST api/auth
// @desc    Authenticate user. User Login
// @access  Public
router.post('/', [
    (0, express_validator_1.check)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // See if user exists
        const user = await User_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }],
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{ msg: 'Invalid Credentials' }],
            });
        }
        console.log('Authenticated User');
        return res.status(201).json(user);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});
exports.default = router;
//# sourceMappingURL=authRoute.js.map