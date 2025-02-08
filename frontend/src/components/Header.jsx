import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-lg bg-primary"
          data-bs-theme="dark"
        >
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              Intern House
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Job Posting
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/jobPosting">
                    Post a Job
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
