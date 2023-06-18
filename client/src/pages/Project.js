import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ContributorCommitMessages from "../components/ContributorCommitMessages.js";
import ContributorCommitMessagesChart from "../components/ContributorCommitMessagesChart";
import FeedBack from "../components/FeedBack";
import swal from "sweetalert";
const Project = () => {
  const { projectId, project } = useParams();

  const [projectDetails, setprojectDetails] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [description, setDescription] = useState("");

  const handleSaveClick = (e) => {
    e.preventDefault();
    try {
      const bodyData = {
        projectId: projectId,
        description: description,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/projects/changeDescription`,
          bodyData
        )
        .then((response) => {
          if (response.data.status === true) {
            swal("Good job!", response.data.message, "success");
          } else {
            swal("Error !", response.data.message, "danger");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/projects/getOneProject/" + projectId
      )
      .then(function (response) {
        setprojectDetails(response.data);
        setDescription(response.data.description);
        setContributors(response.data.contributors);
      });
  }, []);

  // const [userData, setUserData] = useState({
  //   labels: UserData.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained",
  //       data: UserData.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  return (
    <div>
      <NavBar />

      <div className="container">
        <br></br>
        <br></br>
        <h5>{"Project Name: " + project}</h5>
        <div className="row mt-5">
          <div className="col-md-6">
            <div>
              <div>
                <p className="mb-2">{description}</p>
                {/* ---------------------------Modal-------------------- */}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit
                </button>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Change Description
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form onSubmit={handleSaveClick}>
                        <div class="modal-body">
                          <textarea
                            placeholder="Enter your new description"
                            rows={5}
                            className="form-control"
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          ></textarea>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" class="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* -------------------------------------- Modal Ends here --------------------------------- */}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3>contributors</h3>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"> Name</th>

                  <th scope="col">label</th>
                </tr>
              </thead>
              <tbody>
                {contributors?.map((e, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td> {e.label} </td>
                      <td>{e.value}</td>
                    </tr>
                  );
                })}

                {/* <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div class="card">
              {/* <ProjectCommitList  owner="dreamshack1999" repo={projectName} /> */}
              <ContributorCommitMessages
                owner="dreamshack1999"
                repo={project}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <ProjectCommitChart owner="dreamshack1999" repo={projectName}/> */}
            <ContributorCommitMessagesChart
              owner="dreamshack1999"
              repo={project}
            />
            {/* <ProjectVsCommitCount
              owner="vjathishwarya2000"
      
            /> */}
            {/* {" "}
            Chart{" "}
            <div>
              <BarChart chartData={userData} />
            </div> */}
          </div>
        </div>
        <div className="row mt-5"></div>
        <br></br>
        <br></br>
        <div className="alert alert-primary">
          <b>Feedback </b>
        </div>

        {projectDetails?.feedBacksQA?.map((e) => {
          return (
            <div>
              <div className="">{e?.feedback}</div>
            </div>
          );
        })}

        {/* {contributors?.map((e)=>{
        return ( <div>{e.label}</div>)
       })} */}

        {/* <FeedBack projectId="640748a7bfe3ac265c4127f8" /> */}

        <FeedBack projectId={projectId} />
      </div>
      {/* <div className="container mt-3 mb-5">
        <JiraTable projectName={projectName} />
      </div> */}
    </div>
  );
};
export default Project;
