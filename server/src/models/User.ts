import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
        communicationEmail: {
            type: Boolean,
        },
        marketingEmail: {
            type: Boolean,
        },
    },

    messageEmail: {
        type: Boolean,
    },
    securityEmail: {
        type: Boolean,
    },
    acceptedTerms: {
        type: Boolean,
        //required: true,
    },
});


const User = mongoose.model('User', UserSchema);

export default User;