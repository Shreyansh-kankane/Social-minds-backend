const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  }
});

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  website: {
    type: String
  },
  address: {
    type: String
  }
});

const Employee = mongoose.model("Employee", employeeSchema);
const Organization = mongoose.model("Organization", organizationSchema);

module.exports = { Employee, Organization };
