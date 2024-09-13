"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InstagramData_1 = __importDefault(require("../models/InstagramData"));
const instagramCheck_1 = require("../lib/instagram/instagramCheck");
const router = express_1.default.Router();
router.get('/creator/:creatorId', async (req, res) => {
    try {
        const creatorId = req.params.creatorId;
        const creator = await InstagramData_1.default.findOne({ creatorID: creatorId });
        console.log(creator);
        return res.status(200).json(creator);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
router.post('/check/:creatorId', async (req, res) => {
    const { creatorId } = req.params;
    const { accessToken } = req.body;
    try {
        const userPayload = await (0, instagramCheck_1.instagramUserCheck)(accessToken, creatorId);
        if (userPayload) {
            const basicUser = new InstagramData_1.default(userPayload);
            await basicUser.save();
            const insights = await (0, instagramCheck_1.getInsights)(basicUser.businessID);
            res.json({ user: basicUser, insights: insights });
        }
        else {
            res.status(200).send('User already exists');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.post('/insights', async (req, res) => {
    // BusinessID must be passed in the request body
    const { businessID } = req.body;
    try {
        const insights = await (0, instagramCheck_1.getInsights)(businessID);
        res.json(insights);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
exports.default = router;
//# sourceMappingURL=instagramRoute.js.map