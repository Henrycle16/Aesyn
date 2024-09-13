"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const InstagramDataSchema = new mongoose_1.default.Schema({
    creatorID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'creator',
    },
    pageID: {
        type: String,
    },
    businessID: {
        type: String,
    },
    tokenCreationDate: {
        type: Date,
        default: Date.now
    },
    longLivedAccessToken: {
        type: String,
    },
    name: {
        type: String,
    },
    userName: {
        type: String,
    },
    profilePicURL: {
        type: String
    },
    followers_count: {
        type: String
    },
    insights: {
        type: Object
    },
    //To be continued...
});
const SocialMedia = mongoose_1.default.model('instagram_data', InstagramDataSchema);
exports.default = SocialMedia;
//# sourceMappingURL=InstagramData.js.map