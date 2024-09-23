import mongoose from "mongoose";

const DailyMetricSchema = {
  date: {
    type: Date,
  },
  impression: {
    type: Number,
  },
  reach: {
    type: Number,
  },
};

const Media = {
  media_url: { 
    type: String 
  },
  caption: { 
    type: String 
  },
  media_type: {
    type: String
  },
  comments_count: {
    type: Number,
  },
  like_count: {
    type: Number,
  },
  id: {
    type: String,
  },
  timestamp: { 
    type: String 
  },
};

// Top level contains basic user data and keys for retrieval
const InstagramDataSchema = new mongoose.Schema({
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creator",
    required: true,
  },
  pageID: {
    type: String,
  },
  businessID: {
    type: String,
  },
  tokenCreationDate: {
    type: Date,
    default: Date.now,
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
    type: String,
  },

  lastUpdate: {
    type: Date,
    default: Date.now,
  },

  // Stores all metric data to be passed down to front end components.
  insights: {
    followersCount: { type: Number },

    // list of objs for every single day contains reach and impressions.
    dailyMetrics: [DailyMetricSchema],

    followersGender: {
      female: {
        type: Number,
      },
      male: {
        type: Number,
      },
      other: {
        type: Number,
      },
    },

    followersTopCities: [
      {
        location: { type: String },
        value: { type: Number },
      },
    ],

    // List of age groups and their followers count
    followersAge: [
      {
        ageGroup: { type: String },
        value: { type: String },
      },
    ],
  },
  // Stores user media data
  media: {
    media_count: {
      type: Number,
    },
    total_like_count: Number,
    total_comment_count: Number,
    data: [Media]
  }
  
});

const InstagramDB = mongoose.model("instagramDataV2", InstagramDataSchema);

export default InstagramDB;
