"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CreatorSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    userName: {
        type: String,
    },
    gender: {
        type: String,
    },
    location: {
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    preferences: {
        type: [String],
    },
    interests: {
        type: [String],
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },
    portfolio: [
        {
            contentType: {
                type: String,
            },
            mediaType: {
                type: String,
            },
            socialMedia: {
                type: String,
            },
            uri: {
                type: String,
            },
            thumbnailUri: {
                type: String,
            },
            name: {
                type: String,
            },
            campaignTitle: {
                type: String,
            },
            description: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    packages: [
        {
            socialMedia: {
                type: String,
                // enum: ['Instagram', 'Facebook', 'Twitter/X', 'TikTok', 'YouTube', 'Snapchat']
            },
            type: {
                type: String,
            },
            description: {
                type: String,
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});
const Creator = mongoose_1.default.model("Creator", CreatorSchema);
exports.default = Creator;
//# sourceMappingURL=Creator.js.map