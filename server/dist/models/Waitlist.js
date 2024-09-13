"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WaitlistSchema = new mongoose_1.default.Schema({
    applicantType: {
        type: String,
    },
    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    questionnaire: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Waitlist = mongoose_1.default.model("Waitlist", WaitlistSchema);
exports.default = Waitlist;
//# sourceMappingURL=Waitlist.js.map