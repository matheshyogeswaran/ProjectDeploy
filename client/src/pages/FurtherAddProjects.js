import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import NavBar from "../components/Navbar";
const FurtherAddProjects = () => {
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const [incompleteDetProj, setIncompleteDetProj] = useState([]);
  // get incomplete projects
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          `/projects/getIncompleteProjectDetails/${data._id}`
      )
      .then(function (response) {
        setIncompleteDetProj(response.data);
      });
  }, []);
  console.log(incompleteDetProj);

  return (
    <div>
      <NavBar></NavBar>
      <br></br>
      <div className="container">
        <div className="row">
          {incompleteDetProj.map((e) => {
            return (
              <div className="col-md-12" key={e._id}>
                <Link
                  to={"/project/furtherproject/" + e._id}
                  className="btn btn-outline-dark form-control mt-2 "
                  style={{ width: "100%" }}
                >
                  {e.projectName}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FurtherAddProjects;
