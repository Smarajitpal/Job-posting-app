import Header from "../components/Header";
import { useState } from "react";

const AddNewJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    jobDescription: "",
    requiredQualification: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://job-posting-app-one.vercel.app/jobs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw "Failed to add job";
      }

      const data = await response.json();
      if (data) {
        setSuccessMessage("Data Posted Successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-3">Post a Job</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Job Title:</label>
          <input
            className="form-control my-2"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="title">Company Name:</label>
          <input
            className="form-control my-2"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <label htmlFor="title">Location:</label>
          <input
            className="form-control my-2"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <label htmlFor="title">Salary:</label>
          <input
            className="form-control my-2"
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
          <label htmlFor="title">Job Type:</label>
          <select
            className="form-select my-2"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option></option>
            <option value="Full-time (On-site)">Full-time (On-site)</option>
            <option value="Part-time (On-site)">Part-time (On-site)</option>
            <option value="Full-time (Remote)">Full-time (Remote)</option>
            <option value="Part-time (Remote)">Part-time (Remote)</option>
          </select>
          <label htmlFor="title">Job Description:</label>
          <textarea
            className="form-control my-2"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="title">Job Qualifications:</label>
          <textarea
            className="form-control my-2"
            name="requiredQualification"
            value={formData.requiredQualification}
            onChange={handleChange}
            required
          ></textarea>
          <button className="btn btn-primary" type="submit">
            Post Job
          </button>
        </form>
        <br />
        {successMessage && <p>{successMessage}</p>}
      </div>
    </>
  );
};
export default AddNewJobs;
