import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const { data, loading, error } = useFetch(
    `https://job-posting-app-one.vercel.app/jobs/${jobId}`
  );
  

  return (
    <>
      <Header />
      <div className="container mt-3">
        {loading && <p>Loading...</p>}
        {error && <p>Error in fetching details.</p>}
        {data && (
          <>
            <h2>{data.title}</h2>
            <div className="card mt-3 py-4 px-4">
              <p>
                <b>Company Name: </b>
                {data.companyName}
              </p>
              <p>
                <b>Location: </b>
                {data.location}
              </p>
              <p>
                <b>Salary: </b>
                {data.salary}
              </p>
              <p>
                <b>Job Type: </b>
                {data.jobType}
              </p>
              <p>
                <b>Description: </b>
                {data.jobDescription}
              </p>
              <p>
                <b>Qualifications: </b>
              </p>
              <ol>
                {data.requiredQualification.map((qualification, index) => (
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
