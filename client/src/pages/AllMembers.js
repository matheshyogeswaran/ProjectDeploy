import Card from "../components/Card";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AllMembers = () => {
  const [contributorsData, setContributorsData] = useState([]);
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  // get all members
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users/getMembers")
      .then(function (response) {
        setContributorsData(response.data);
      });
  }, []);

  console.log(contributorsData);

  return (
    <>
    <NavBar />
    <div className="container my-5">
      <h1 className="mb-4">All Members</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* mapping for all members */}
          {contributorsData.map((contributor) => (
            <tr key={contributor._id}>
              <td>{contributor.fname}</td>
             
               
                
              {data.userRoleName === "Techlead" ? (
                
                <td>
                  {data.userRoleName === "Techlead" ? (
                    <Link
                      to={"/profiles/" + contributor._id}
                      className="btn btn-sm btn-outline-dark form-control"
                       style={{ backgroundColor: "#2D033B", color: "white" ,width: '30%'}}
                    >
                      Add Rating
                    </Link>
                  ) : null}
                </td>
              ) : (
                <td></td>
              )}
              <td>
                
                <Link
                  to={"/users/getMembersProfile/" + contributor._id}
                  className="btn btn-sm btn-dark form-control "
                  style={{ backgroundColor: "#2D033B", color: "white" ,width: '50%'}}
                >
                  View
                </Link>
              </td>
             
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  
  
  );
};

export default AllMembers;
