"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryResponse_1 = require("../lib/ai/queryResponse");
const User_1 = __importDefault(require("../models/User"));
// import { getResponse } from '../lib/chatModel';
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const context = await (0, queryResponse_1.getContext)(req.body.query);
        const ids = context.map(item => item.id);
        const users = await User_1.default.find({
            _id: { $in: ids }
        });
        // const suggestedUsers = getResponse(req.body.query, users);
        res.status(201).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.default = router;
//# sourceMappingURL=queriesRoute.js.map