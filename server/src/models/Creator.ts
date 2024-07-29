import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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

const Creator = mongoose.model("Creator", CreatorSchema);

export default Creator;
