import mongoose from 'mongoose';

const CreatorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    socialMedias: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    category: {
        type: [String],
    },
    location: {
        city: { 
            type: String
        },
        country: {
            type: String
        }
    },
    bio: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Creator = mongoose.model('Creator', CreatorSchema);

export default Creator;