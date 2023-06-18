import NavBar from "../components/Navbar";
import { UserData } from "../components/chart/Data";
import BarChart from "../components/chart/BarChart";
import ProjectDetails from "../data/Project.json";
import { Link } from "react-router-dom";
import Progressb from "../components/Progress";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ProgressBar } from "react-bootstrap";
import JiraTableQA from "../components/jiraTableQA";
import PieChartComponent from "../components/PieChartComponent";
import ProjectVsCommitCount from "../components/ProjectVsCommitCount";
/** */
import jwt_decode from "jwt-decode";
import JiraTableAll from "../components/JiraTableAll";
const DashboardBA = () => {
  //
  const userID = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData
    ._id;
  const [userProjects, setUserProjects] = useState([]);
  const [taken, setTaken] = useState([]);
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const userId = data._id;
  const gitUserName = data.GitHubUsername;
  const [stageUpdate, setStageUpdate] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects/getProjectDetails/${userID}`)
      .then(function (response) {
        setUserProjects(response.data);
        console.log(response.data);
      });
  }, [stageUpdate]);

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

  //
  const updateStatus = (value, projectID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:8000/project/addStage", {
            projectId: projectID,
            stage: value,
          })
          .then((res) => {
            if (res.data.status === true) {
              Swal.fire("Updated!", "Stage updated Successfully.", "success");
              setStageUpdate(stageUpdate + 1);
            } else {
              alert("Fail to Change stage");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

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
      <div className="container ">
        <div className="row mt-5 justify-content-md-center ">
          <div className="col-md-10 ">
            <div className="container-fluid ">
              <div
                className="row flex-row flex-nowrap mt-4 pb-4 pt-2 "
                style={{ overflowX: "auto" }}
              >
                {userProjects?.map((e) => {
                  return (
                    // width of a single card is 3
                    <div className="col-md-3">
                      <div className="card">
                        {/* Card heading */}
                        <div className="card-header">
                          <h5 className="card-title">{e?.projectName}</h5>
                        </div>
                        <div className="card-body">
                          {/* Project description  */}
                          <div
                            style={{
                              maxHeight: "70px",
                              overflow: "auto",
                              minHeight: "70px",
                            }}
                          >
                            {e.description}
                          </div>
                          <ProgressBar variant="success" now={e?.stage} />
                        </div>
                        <div className="card-footer">
                          <select
                            style={{
                              backgroundColor: "#2D033B",
                              color: "white",
                            }}
                            onChange={(x) => {
                              updateStatus(x.target.value, e?._id);
                            }}
                          >
                            <option disabled selected>
                              Select Stage
                            </option>
                            <option value="0">Reset</option>
                            <option value="25">Stage 1</option>
                            <option value="50">Stage 2</option>
                            <option value="75">Stage 3</option>
                            <option value="100">Stage 4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div className="col-md-2"></div> */}
        </div>

        {/* Bar Chart */}
        <div class="row justify-content-center">
          <div class="col-12">
            <JiraTableAll />
          </div>
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

        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default DashboardBA;
