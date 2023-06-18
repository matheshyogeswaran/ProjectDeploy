// import addtowishlist from "../images/addtowishlist.png";
// import { SocialIcon } from "react-social-icons";
import "../App.css";
import jwt_decode from "jwt-decode";
import NavBar from "../components/Navbar";
import React, { useEffect, useState } from "react";

function Profile(props) {
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const username = data.GitHubUsername;
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
  console.log(data);
  return (
    <>
      <NavBar />
      <div className="row justify-content-center ">
        <div className="col-md-8">
          <div
            className="card mt-5 crud shadow-lg p-3 mb-5 mt-5 bg-body rounded "
            // style={{ backgroundColor: "rgb(199,227,244)" }}
          >
            <h3 className="text-center">Profile</h3>

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
                      value={data?.fname}
                      disabled={true}
                    />
                    {console.log(data?.fname)}
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
                      value={data?.userRoleName}
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
                      value={data?.GitHubUsername}
                      disabled={true}
                    />
                    {console.log(data?.GitHubUsername)}
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
                      value={data?.orangeHrLink}
                      disabled={true}
                    />
                    {console.log(data?.orangeHrLink)}
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
                      value={data?.email}
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
                      value={data?.phone}
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
                      value={data?.userJiraLink}
                      disabled={true}
                    />
                  </div>
                </div>
                <br></br>
                <a
                  href="http://localhost:3000/editprofile"
                  class="btn form-control"
                  role="button"
                  aria-pressed="true"
                  style={{ backgroundColor: "#2D033B", color: "white" }}
                >
                  Edit Profile
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
