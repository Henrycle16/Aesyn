import mongoose from "mongoose";

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
  },
  securityEmail: {
    type: Boolean,
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
    } else {
      this.communicationEmail = false;
      this.marketingEmail = false;
    }
  }
  next();
});


const User = mongoose.model("User", UserSchema);

export default User;
