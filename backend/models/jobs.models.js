const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    companyName: { type: String, require: true },
    location: { type: String, require: true },
    salary: { type: Number, require: true },
    jobType: {
      type: String,
      enum: [
        "Full-time (On-site)",
        "Part-time (On-site)",
        "Full-time (Remote)",
        "Part-time (Remote)",
      ],
    },
    jobDescription: { type: String, require: true },
    requiredQualification: [{ type: String, require: true }],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
