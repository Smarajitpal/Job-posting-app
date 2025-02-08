import Header from "./components/Header";
import useFetch from "./useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";
function App() {
  const { data, loading, error } = useFetch("http://localhost:3100/jobs");

  const [job, setJob] = useState([]);
  if (job.length === 0 && data) {
    setJob(data);
  }
  const handleChange = (ev) => {
    const selectedTitle = ev.target.value;
    if (data) {
      if (selectedTitle === "") {
        setJob(data);
      } else {
        setJob(
          data.filter((j) => j.title.toLowerCase().includes(selectedTitle))
        );
      }
    }
  };
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:3100/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw "Failed to delete Job.";
      }
      const data = response.json();
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <main className="container">
        <section>
          <input
            type="text"
            className="form-control w-50 mt-3"
            placeholder="Search by job title..."
            onChange={handleChange}
          />
        </section>
        <h1 className="mt-3">All Jobs</h1>
        <div className="row">
          {loading && <p>Loading...</p>}
          {error && <p>Error occured in fetching the data.</p>}
          {job.map((item) => (
            <div key={item._id} className="col-md-4">
              <div className="card mb-3 container py-4 px-5">
                <h5 className="card-title">{item.title}</h5>
                <p>
                  <b>Company Name: </b>
                  {item.companyName}
                </p>
                <p>
                  <b>Location: </b>
                  {item.location}
                </p>
                <p>
                  <b>Job Type: </b>
                  {item.jobType}
                </p>
                <div className="row">
                  <div className="col btn-group">
                    <Link
                      to={`/job/${item._id}`}
                      type="button"
                      className="btn btn-primary"
                    >
                      See Details
                    </Link>
                  </div>
                  <div className="col btn-group">
                    <Link
                      onClick={() => handleDelete(item._id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
