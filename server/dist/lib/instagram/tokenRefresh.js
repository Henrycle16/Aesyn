"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRefresh = void 0;
const InstagramData_1 = __importDefault(require("../../models/InstagramData"));
const instagramGraphAPI_1 = require("../../services/instagramGraphAPI");
const tokenRefresh = async () => {
    try {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        const users = await InstagramData_1.default.find({ tokenCreationDate: { $lt: tenDaysAgo } });
        console.log(`Number of users being updated: ${users.length}`);
        for (let user of users) {
            const oldLongToken = user.longLivedAccessToken;
            const newLongtoken = await (0, instagramGraphAPI_1.getLongLivedAccessToken)(oldLongToken);
            await InstagramData_1.default.findOneAndUpdate({ _id: user._id }, { $set: { longLivedAccessToken: newLongtoken, tokenCreationDate: new Date() } }, // Update token and tokenCreationDate
            { new: true });
        }
        return "Tokens refreshed successfully";
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.tokenRefresh = tokenRefresh;
//# sourceMappingURL=tokenRefresh.js.map