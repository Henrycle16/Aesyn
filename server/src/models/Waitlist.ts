import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema({
  applicantType: {
    type: String,
  },
  email: {
    type: String,
    //required: true,
    //unique: true,
  },
  firstName: {
    type: String,
    //required: true,
  },
  lastName: {
    type: String,
    //required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Waitlist = mongoose.model("Waitlist", WaitlistSchema);

export default Waitlist;
