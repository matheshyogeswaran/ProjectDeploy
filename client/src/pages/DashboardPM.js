//import { Link } from "react-router-dom";
import BarChart from "../components/chart/BarChart";
import { UserData } from "../components/chart/Data";
import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";

import ProjectVsCommitCount from "../components/ProjectVsCommitCount";

import { Link } from "react-router-dom";
import PieChartComponent from "../components/PieChartComponent";
import axios from "axios";
import jwt_decode from "jwt-decode";
import JiraTableAll from "../components/JiraTableAll";

const DashboardPM = () => {
  const [projectDetails, setprojectDetails] = useState([]);
  // orangeHR leave fetch
  const [taken, setTaken] = useState([]);
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const userId = data._id;
  const gitUserName = data.GitHubUsername;
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/users/leave/${userId}`)
      .then(function (response) {
        setTaken(response.data[0]);
      });
  }, []);
  console.log(taken.taken);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/projects/getProjectDetails")
      .then(function (response) {
        setprojectDetails(response.data);
      });
  }, []);

  // we get as string so convert to float
  const leaveTaken = parseFloat(taken.taken);
  const notLeaveTaken = 1 - leaveTaken;

  const pieData = [
    { name: "Taken", value: leaveTaken * 100 },
    { name: "Not Taken", value: notLeaveTaken * 100 },
  ];
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      <NavBar />
      {/* <div
        className="side-bar"
        style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
      >
        <SideBar />
      </div> */}
      <div className="container">
        {/* <ProjectProgress /> */}
        <div className="row mt-5">
          <div className="col-md-3">
            Add Projects
            <br />
            <br />
            <div>
              <Link to="/project/createProject">
                <i class="bi bi-plus-circle"></i>
              </Link>{" "}
              Create New Project{" "}
            </div>{" "}
          </div>
          <div className="col-md-12 overflow-auto">
            <div className="container-fluid">
              <div
                className="row flex-row flex-nowrap mt-4 pb-4 pt-2"
                style={{ overflowX: "auto" }}
              >
                {/* map for project details and link */}
                {projectDetails.map((e) => {
                  return (
                    <div className="col-md-3">
                      <div className="card shadow-lg" >
                        <div className="card-header">
                          <h5 className="card-title">{e.projectName}</h5>
                        </div>
                        <div className="card-body">
                        <div style={{ maxHeight: "70px", overflow: "auto", minHeight: "70px" }}>
                        {e.description}
                      </div>
                        </div>
                        <div className="card-footer"  style={{ backgroundColor: "#2D033B", color: "white" }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <JiraTableAll />
        </div>
        <br></br>
        <br></br>
        <div className="row mt-5">
          <div className="col-md-6">
            <div>
              <ProjectVsCommitCount owner={gitUserName} />
            </div>
          </div>
          <div className="col-md-6">
            {/* pie chart component for orangeHR chart */}
             
                <PieChartComponent data={pieData} />
              
            </div>
          </div>
        </div>

    </div>
  );
};

export default DashboardPM;