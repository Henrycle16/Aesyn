import mongoose from 'mongoose';

const BrandScheme = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    companyName: {
        type: String,
        required: true,
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
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    industry: {
        type: String,
    },
    preferences: [
        String
    ]
});

const Brand = mongoose.model('Brand', BrandScheme);

export default Brand;