import { Link } from "react-router-dom";
import "../css/Nav.css";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const username = data.GitHubUsername;
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    fetch(`//api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAvatarUrl(data.avatar_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top sticky-top"
        style={{ backgroundColor: "#2D033B" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"></Link>
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
            <ul className="navbar-nav ms-md-auto gap-2">
              <li className="nav-item rounded">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard"
                >
                  <i className="bi bi-house-fill me-2"></i>Dashboard
                </Link>
              </li>
              <li className="nav-item rounded">
                <Link className="nav-link active" to="/allprojects">
                  <i className="bi bi-code-square me-2"></i> All Projects
                </Link>
              </li>
              
              {/* <li className="nav-item rounded">
                <Link className="nav-link active" to="/allmembers">
                  <i className="bi bi-code-square me-2"></i> All Members
                </Link>
              </li> */}
              <li className="nav-item rounded">
                <Link className="nav-link active" to="/lboard">
                <i class="bi bi-graph-up-arrow"></i>   Stats
                </Link>
              </li>
              <li className="nav-item rounded">
                <Link className="nav-link active" to="/Todolist">
                  <i className="bi bi-telephone-fill me-2"></i>Todo
                </Link>
              </li>
              <li className="nav-item rounded">
                <Link className="nav-link active" to="/UserNotificationList">
                  <i className="bi bi-bell-fill me-2" style={{ fontStyle: 'normal' }}> Notification </i>
                </Link>
              </li>
              <li className="nav-item dropdown rounded">
                <Link
                  className="nav-link active dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {avatarUrl && (
                    <img
                      src={avatarUrl}
                      alt={`${username}'s avatar`}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid white",
                        marginRight: "10px",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  )}
                  <span>
                    <i className=""></i>Profile
                  </span>
                </Link>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  style={{ backgroundColor: "#2D033B" }}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile/"
                      style={{
                        color: "white",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                      }}
                    >
                      Account
                    </Link>
                  </li>

                  {/* <li><Link className="dropdown-item" to="#">Another action</Link></li> */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/allmembers"
                      style={{
                        color: "white",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                      }}
                    >
                      All Members
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/" onClick={logout}  style={{
                        color: "white",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                      }}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
