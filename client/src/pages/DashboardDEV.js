import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../components/chart/Data";
import BarChart from "../components/chart/BarChart";
import ProjectDetails from "../data/Project.json";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PieChartComponent from "../components/PieChartComponent";
import ProjectVsCommitCount from "../components/ProjectVsCommitCount";
import JiraTableAll from "../components/JiraTableAll";
const DashboardDEV = () => {
  const [projectDetails, setprojectDetails] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [taken, setTaken] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const userId = data._id;
  const gitUserName = data.GitHubUsername;
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/leave/${userId}`)
      .then(function (response) {
        setTaken(response.data[0]);
      });
  }, []);
  // console.log(taken.taken);
  const leaveTaken = parseFloat(taken?.taken);
  const notLeaveTaken = 1 - leaveTaken;

  const pieData = [
    { name: "Taken", value: leaveTaken * 100 },
    { name: "Not Taken", value: notLeaveTaken * 100 },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects/getFeedback/${userId}`)
      .then(function (response) {
        setFeedbacks(response.data);
      });
  }, []);
  console.log(feedbacks);
  useEffect(() => {
    axios
      .get("http://localhost:8000/projects/getProjectDetails")
      .then(function (response) {
        setprojectDetails(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects/getProjectDetailsTL/${data._id}`)
      .then(function (response) {
        setMyProjects(response.data);
      });
  }, []);
  console.log(myProjects);

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

      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12 overflow-auto">
            <div className="container-fluid">
              <div
                className="row flex-row flex-nowrap mt-4 pb-4 pt-2"
                style={{ overflowX: "auto" }}
              >
                {projectDetails?.map((e) => {
                  return (
                    <div className="col-md-3">
                      <div
                        className="card"
                        
                      >
                        <div className="card-header">
                          <h5 className="card-title">{e?.projectName}</h5>
                        </div>
                        <div className="card-body">
                          <img
                            src={e?.projectLogo}
                            className="rounded-circle"
                            style={{ width: "40px" }}
                          ></img>
                          <p>{}</p>
                        </div>
                        <div className="card-footer">
                          <Link
                            to={"/project/" + e?._id + "/" + e?.projectName}
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

        <div className="row mt-5">
          <div class="col-md-6">
            <ProjectVsCommitCount owner={gitUserName} />
            {/* {" "}
            Chart{" "}
            <div>
              <BarChart chartData={userData} />
            </div> */}
          </div>
          <div class="col-md-6">
            <PieChartComponent data={pieData} />
          </div>
        </div>
        <JiraTableAll />
      </div>

      {/* <div className="container mt-5 mb-5">Project feedback under My Lead</div>
      <h3 className="row justify-content-center">project under my lead</h3> */}
    </div>
  );
};

export default DashboardDEV;
