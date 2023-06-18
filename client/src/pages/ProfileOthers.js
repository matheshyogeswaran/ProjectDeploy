import "../App.css";
import jwt_decode from "jwt-decode";
import NavBar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProfileOthers(props) {
  const { id } = useParams();
  
  const [membersProfile, setMembersProfile] = useState([]);
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  // get all members
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/users/getMembersProfile/${id}`)
      .then(function (response) {
        setMembersProfile(response.data);
      });
  }, []);


  const username = membersProfile[0]?.GitHubUsername;
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    fetch(`//api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAvatarUrl(data.avatar_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);
console.log(membersProfile[0]?.fname);
  return (
    <>
    <NavBar />
    <div className="row justify-content-center ">
      <div className="card ">
        <div className="card-body">
          <h3 className="text-center">Profile {membersProfile[0]?.fname}</h3>
        </div>
      </div>
      <div className="col-md-8">
        <div
          className="card mt-5 crud shadow-lg p-3 mb-5 mt-5 bg-body rounded "
          // style={{ backgroundColor: "rgb(199,227,244)" }}
        >
          <div className="col d-flex justify-content-center mt-3">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={`${username}'s avatar`}
                style={{
                  width: "125px",
                  height: "125px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid white",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
              />
            )}
          </div>
          <div className="card-body">
            <form>
              <div className="row justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="inputFirstName">Name</label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="text"
                    className="form-control a2"
                    id="inputFirstName"
                    value={membersProfile[0]?.fname}
                    disabled={true}
                  />
                  {console.log(membersProfile[0]?.fname)}
                </div>
              </div>

              <div className="row mt-2 justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="userRoleName">userRoleName</label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="text"
                    className="form-control a2"
                    id="userRoleName"
                    value={membersProfile[0]?.userRoleName}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row mt-2 justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="GitHubUsername">GitHubUsername</label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="text"
                    className="form-control a2"
                    id="GitHubUsername"
                    value={membersProfile[0]?.GitHubUsername}
                    disabled={true}
                  />
                  {console.log(membersProfile[0]?.GitHubUsername)}
                </div>
              </div>
              <div className="row mt-2 justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="orangeHrLink">orangeHrLink</label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="url"
                    className="form-control a2"
                    id="orangeHrLink"
                    value="orangeHrLink/user"
                    disabled={true}
                  />
                  {console.log(membersProfile[0]?.orangeHrLink)}
                </div>
              </div>
              <div className="row mt-2 justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="Email">Email</label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="email"
                    className="form-control a2"
                    id="Email"
                    value={membersProfile[0]?.email}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row mt-2 justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="phoneNo">Phone No</label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="tel"
                    className="form-control a2"
                    id="phoneNo"
                    value={membersProfile[0]?.phone}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row mt-2 justify-content-center">
                <div className="col-md-2"></div>
                <div className="form-group col-md-3">
                  <label for="userJiraLink">UserJiraLink </label>
                </div>
                <div className="form-group col-md-5">
                  <input
                    type="url"
                    className="form-control a2"
                    id="userJiraLink"
                    value={membersProfile[0]?.userJiraLink}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row mt-2 ">
                <div className="col-md-2"></div>
                {/* <div className="col-md-3 mt-3">
                <button
                  type="submit"
                  className="btn form-control  border border-secondary "
                  style={{ background: "#ass" }}
                >
                  <i className="bi bi-heart" style={{ height: "50px" }}></i>
                  <h6>Add to wishlist</h6>
                </button>
              </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default ProfileOthers;
