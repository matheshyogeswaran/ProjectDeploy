import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import { UserData } from "../components/chart/Data";
import BarChart from "../components/chart/BarChart";
import Modal from "../components/comment";
import ProjectDetails from "../data/Project.json";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import JiraTableQA from "../components/jiraTableQA";
import PieChartComponent from "../components/PieChartComponent";
import ProjectVsCommitCount from "../components/ProjectVsCommitCount";
import JiraTableAll from "../components/JiraTableAll";

const DashboardQA = () => {
  const userID = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData
    ._id;
  const [userProjects, setUserProjects] = useState([]);
  const [taken, setTaken] = useState([]);
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const userId = data._id;
  const gitUserName = data.GitHubUsername;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects/getProjectDetails/${userID}`)
      .then(function (response) {
        setUserProjects(response.data);
        console.log(response.data);
      });
  }, []);

  // orangeHR leave fetch
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/users/leave/${userId}`)
      .then(function (response) {
        setTaken(response.data[0]);
      });
  }, []);
  console.log(taken.taken);
  // we get as string so convert to float
  const leaveTaken = parseFloat(taken.taken);
  const notLeaveTaken = 1 - leaveTaken;

  const pieData = [
    { name: "Taken", value: leaveTaken * 100 },
    { name: "Not Taken", value: notLeaveTaken * 100 },
  ];

  const [modal, setModal] = useState(false);
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
  const addComment = (projectID, projectName) => {
    const message = prompt("Enter Comment for " + projectName);
    axios
      .post("http://localhost:8000/project/addFeedQA", {
        projectId: projectID,
        feedback: message,
        feedBy: userID,
      })
      .then((res) => {
        if (res.data.status === true) {
          alert("Comment Added Successfully");
        } else {
          alert("Fail to add comment");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container ">
        <div className="row mt-5 justify-content-md-center ">
          <div className="col-md-10 ">
            <div className="container-fluid ">
              <div
                className="row flex-row flex-nowrap mt-4 pb-4 pt-2 "
                style={{ overflowX: "auto" }}
              >
                {userProjects.map((e) => {
                  return (
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-header text-center">
                          <h5 className="card-title">{e?.projectName}</h5>
                        </div>
                        <div className="card-body">
                          {/* Project Name: {e?.projectName} <br></br> */}
                          {/* project Description: {e?.description} */}{" "}
                          <div
                            style={{
                              maxHeight: "70px",
                              overflow: "auto",
                              minHeight: "70px",
                            }}
                          >
                            {e.description}
                          </div>
                        </div>
                        <div className="card-footer ">
                          <button
                            className="btn btn-white form-control"
                            style={{
                              backgroundColor: "#2D033B",
                              color: "white",
                            }}
                            onClick={() => {
                              addComment(e?._id, e?.projectName);
                            }}
                          >
                            Add Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="col-md-5">
            {" "}
            <div className="mt-5">
              <Link
                to="/projectsQA"
                className="btn btn-outline-primary form-control"
              >
                My Projects
              </Link>
            </div>
          </div> */}
        </div>

        <div className="row mt-5">
          <div className="col-md-6">
            <ProjectVsCommitCount owner={gitUserName} />
          </div>
          <div className="col-md-6">
            {/* pie chart component for orangeHR chart */}
            <div className="row">
              <div className="col-md-12">
                <PieChartComponent data={pieData} />
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <JiraTableAll />
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
    // </div>
  );
};

export default DashboardQA;
