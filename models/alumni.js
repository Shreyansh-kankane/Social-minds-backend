const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  linkedin: {
    type: String
  }
});

const Alumni = mongoose.model("Alumni", alumniSchema);
module.exports = Alumni;
