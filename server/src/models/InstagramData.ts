import mongoose from 'mongoose';

const InstagramDataSchema = new mongoose.Schema({
    creatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'creator',
    },
    pageID:{
        type: String,
    },
    businessID: {
        type: String,
    },
    tokenCreationDate:{
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
    followers_count:{
        type: String
    },
    insights: {
        type: Object
    },

    //To be continued...
});

const SocialMedia = mongoose.model('instagram_data', InstagramDataSchema);

export default SocialMedia;