import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../components/chart/Data";
import { Link } from "react-router-dom";

import jwt_decode from "jwt-decode";
import PieChartComponent from "../components/PieChartComponent";
import JiraTableAll from "../components/JiraTableAll";
/** */
const DashboardTL = () => {
  const [projectDetails, setprojectDetails] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [taken, setTaken] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const userId = data._id;
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

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/projects/getFeedback/${userId}`)
      .then(function (response) {
        setFeedbacks(response.data);
      });
  }, []);
  console.log(feedbacks);

  //  Get project details.
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/projects/getProjectDetails")
      .then(function (response) {
        setprojectDetails(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/projects/getProjectDetailsTL/${data._id}`
      )
      .then(function (response) {
        setMyProjects(response.data);
      });
  }, []);
  console.log(myProjects);
  //for testing purpurse
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
        {/* <div
          className="side-bar"
          style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
        >
          <SideBar />
        </div> */}
        <div
          className="container"
          style={{ background: "white", borderRadius: "10px" }}
        >
          <div
            className="row mt-5"
            style={{ background: "white", borderRadius: "10px" }}
          >
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
                        <div className="card">
                          <div className="card-header">
                            <h5 className="card-title">{e.projectName}</h5>
                          </div>
                          <div
                            style={{
                              maxHeight: "100px",
                              overflow: "auto",
                              minHeight: "100px",
                            }}
                          >
                            {e.description}
                          </div>
                          <div className="card-footer">
                            <Link
                              to={"/project/" + e._id + "/" + e.projectName}
                              className="btn btn-outline-dark form-control"
                              style={{
                                backgroundColor: "#2D033B",
                                color: "white",
                              }}
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
            <div className="row">
              <div className="col-md-12">
                <div className="mt-5">
                  {/* project which do not fill by Techlead but fill by project manager */}
                  <Link
                    to="/furtheraddprojects"
                    className="btn btn-outline-secondary form-control"
                  >
                    Incomplete project details
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                {/* <div className="mt-5">
                 
                  <Link
                    to="/project/createproject"
                    className="btn btn-outline-secondary form-control"
                  >
                    Create project
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {/* testing purpose */}
            <div className="col-md-12">
              <JiraTableAll />
            </div>
            <div className=" col-md-2"></div>
          </div>
          <div className="row mt-5">
            <div class="col-md-10">
              {/* {" "}
            Chart{" "}
            <div>
              <BarChart chartData={userData} />
            </div> */}
            </div>
          </div>

          {/* pie chart component for orangeHR chart */}
          <div className="row">
            <div className="col-md-6">
              <PieChartComponent data={pieData} />
            </div>
          </div>
        </div>

        <div className="container mt-5 mb-5"></div>
        <h5 className="border border-dark p-4 rounded rounded shadow-lg">Project under my lead</h5>
        <div className="container mt-5">
          {" "}
          {/* projects under the tech lead */}
          <div className="row mb-3">
            {myProjects.map((e) => {
              return (
                <div className="col-md-4 mt-3">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">{e.projectName}</h5>
                    </div>
                    <div className="card-footer">
                      {/* link for specifi project page here i sent project id and name by params */}
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

export default DashboardTL;
