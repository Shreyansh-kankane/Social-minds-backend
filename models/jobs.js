const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  salary: {
    type: Number
  },
  requirements: {
    type: String
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
