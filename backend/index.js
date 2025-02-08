const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const Job = require("./models/jobs.models");
const cors = require("cors");
initializeDatabase();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

async function createJob(jobData) {
  try {
    const job = new Job(jobData);
    const jobDetails = await job.save();
    return jobDetails;
  } catch (error) {
    throw error;
  }
}

app.post("/jobs", async (req, res) => {
  try {
    const addedJob = await createJob(req.body);
    if (addedJob) {
      res.status(200).json({ message: "Job added successfully." });
    } else {
      res.status(404).json({ error: "Job cannot be added." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add job." });
  }
});

async function readAllJobs() {
  try {
    const allJobs = await Job.find();
    return allJobs;
  } catch (error) {
    throw error;
  }
}

app.get("/jobs", async (req, res) => {
  try {
    const allJobsData = await readAllJobs();
    if (allJobsData.length != 0) {
      res.send(allJobsData);
    } else {
      res.status(404).json({ error: "Jobs not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
});

async function deleteJobById(jobId) {
  try {
    const deleteJob = await Job.findByIdAndDelete(jobId);
    return deleteJob;
  } catch (error) {
    throw error;
  }
}
app.delete("/jobs/:jobId", async (req, res) => {
  try {
    const deletedJob = await deleteJobById(req.params.jobId);
    if (deletedJob) {
      res.status(200).json({ message: "Job deleted successfully." });
    } else {
      res.status(404).json({ error: "Job not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Job" });
  }
});

const PORT = 3100;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
