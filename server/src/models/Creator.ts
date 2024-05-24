import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: {
        type: String
    },
    gender: {
        type: String,
    },
    location: {
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    preferences: {
        type: [String]
    },
    niche: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Creator = mongoose.model('Creator', CreatorSchema);

export default Creator;