"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        //required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    username: {
        type: String,
        //required: true,
        //unique: true,
    },
    email: {
        type: String,
        //required: true,
        //unique: true,
    },
    password: {
        type: String,
        //required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userType: {
        type: String,
        //required: true,
    },
    description: {
        type: String,
        //required: true,
    },
    promotional: {
        type: Boolean,
    },
    communicationEmail: {
        type: Boolean,
    },
    marketingEmail: {
        type: Boolean,
    },
    messageEmail: {
        type: Boolean,
        default: true
    },
    securityEmail: {
        type: Boolean,
        default: true
    },
    acceptedTerms: {
        type: Boolean,
        //required: true,
    },
});
UserSchema.pre('save', function (next) {
    if (this.isModified('promotional')) {
        if (this.promotional) {
            this.communicationEmail = true;
            this.marketingEmail = true;
        }
        else {
            this.communicationEmail = false;
            this.marketingEmail = false;
        }
    }
    next();
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map