import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  speaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Webinar = mongoose.model("Webinar", webinarSchema);
export default Webinar;
