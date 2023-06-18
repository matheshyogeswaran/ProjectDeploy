import Card from "../components/Card";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
const ProjectsQA = () => {
    const [myProjects, setMyProjects] = useState([]);
    const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
    const userId = data._id;
    useEffect(() => {
      axios

        .get(process.env.REACT_APP_API_URL+`/projects/getProjectDetails/${userId}`)

        .then(function (response) {
          setMyProjects(response.data);
        });
    }, []);
    console.log(myProjects);
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
            {myProjects.map((e) => {
              return (
                <div className="col-12 mt-3">
                  <div
                    className="card"
                    style={{ backgroundColor: "rgb(223,255,213)" }}
                  >
                    <div className="card-header">
                      <h5 className="card-title">{e.projectName}</h5>
                    </div>
                    <div className="card-footer">
                      <Link
                        to={"/projectscommentQA/" + e._id + "/" + e.projectName}
                        className="btn btn-outline-primary form-control"
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
export default ProjectsQA;
