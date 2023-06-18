import Card from "../components/Card";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProjects = () => {
  const [projectDetails, setprojectDetails] = useState([]);

  // get project details
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/projects/getProjectDetails")
      .then(function (response) {
        setprojectDetails(response.data);
      });
  }, []);
  console.log(projectDetails);

  return (
    <div>
      <NavBar />
      {/* <div
        className="side-bar"
        style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
      >
        <SideBar />
      </div> */}

      <div className="container mt-5"></div>
      <div className="container mt-5 ">
        <div className="container-fluid ">
          <div className="row">
            {/* map for project details */}
            {projectDetails.map((e) => {
              return (
                <div className="col-md-4 mt-3">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">
                        <center>{e.projectName}</center>
                      </h5>
                      <hr></hr>
                      <div style={{ maxHeight: "70px", overflow: "auto", minHeight: "70px" }}>
                        {e.description}
                      </div>
                    </div>
                    <div className="card-footer">
                      <Link
                        to={"/project/" + e._id + "/" + e.projectName}
                        className="btn btn-outline-dark form-control"
                        style={{ backgroundColor: "#2D033B", color: "white" }}
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProjects;
