import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema({
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

const Waitlist = mongoose.model("Waitlist", WaitlistSchema);

export default Waitlist;
