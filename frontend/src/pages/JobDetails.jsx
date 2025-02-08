import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const { data, loading, error } = useFetch(
    "https://job-posting-app-one.vercel.app/jobs"
  );
  const jobData = data?.find((job) => jobId === job._id);

  return (
    <>
      <Header />
      <div className="container mt-3">
        {loading && <p>Loading...</p>}
        {error && <p>Error in fetching details.</p>}
        {jobData && (
          <>
            <h2>{jobData.title}</h2>
            <div className="card mt-3 py-4 px-4">
              <p>
                <b>Company Name: </b>
                {jobData.companyName}
              </p>
              <p>
                <b>Location: </b>
                {jobData.location}
              </p>
              <p>
                <b>Salary: </b>
                {jobData.salary}
              </p>
              <p>
                <b>Job Type: </b>
                {jobData.jobType}
              </p>
              <p>
                <b>Description: </b>
                {jobData.jobDescription}
              </p>
              <p>
                <b>Qualifications: </b>
              </p>
              <ol>
                {jobData.requiredQualification.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDetails;
