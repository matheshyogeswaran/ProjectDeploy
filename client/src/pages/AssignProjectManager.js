import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavBar from "../components/Navbar";

const AssignProjectManager = () => {
  const [projectManagerData, setProjectManagerData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users/all")
      .then(function (response) {
        setProjectManagerData(response.data);
      });
  }, []);

  const submitProjectManagerData = (e) => {
    e.preventDefault();
    const postData = {
      projectManagerData: projectManagerData,
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + "/users/assignProjectManager",
        postData
      )
      .then((res) => {
        alert(res.data.message);
        swal("Project Manager Assigned", {
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div>
        {" "}
        <NavBar />
        <div className="container mt-3 ">
          <div className="card shadow shadow-lg">
            <form onSubmit={submitProjectManagerData}>
              <div className="card-body mt-3">
                <div className="row m-2">
                  {/* Project Name */}
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        className="form-control"
                        placeholder="Project Manager Name"
                        value={projectManagerData}
                        required
                        id="projectManager"
                        onChange={(e) => setProjectManagerData(e.target.value)}
                      >
                        <option selected value="" disabled>
                          Select Project Manager
                        </option>
                        {projectManagerData.map((item) => {
                          return (
                            <option value={item._id}>
                              {item.fname + " " + item.lname}
                            </option>
                          );
                        })}
                      </select>

                      <label for="projectname">Project Manager Name</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>

    /* <button onClick={handleButtonClick}>Assign Project Manager</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
            placeholder="Enter project manager name"
          />
          <button type="submit">Assign</button>
        </form>
      )} */
  );
};

export default AssignProjectManager;
