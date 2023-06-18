import "../App.css";
import jwt_decode from "jwt-decode";
import NavBar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
const EditProfile = () => {
  let data;
  data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const username = data?.GitHubUsername;
  const [avatarUrl, setAvatarUrl] = useState("");
  // new data
  const [newGitHUb, setNewGitHub] = useState(data?.GitHubUsername);
  const [newJira, setNewJira] = useState(data?.userJiraLink);
  const [newOrange, setNewOrange] = useState(data?.orangeHrLink);
  const [newPhone, setNewPhone] = useState(data?.phone);

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
  const handleUpdate = (e) => {
    e.preventDefault();
    const bodyData = {
      userID: data._id,
      newGithub: newGitHUb,
      newJira: newJira,
      newOrange: newOrange,
      newPhone: newPhone,
    };
    axios
      .post("http://localhost:8000/users/updateUserProfile", bodyData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <NavBar />
      <div className="row justify-content-center ">
        <div className="col-md-8">
          <div
            className="card mt-5 crud shadow-lg p-3 mb-5 mt-5 bg-body rounded "
            // style={{ backgroundColor: "rgb(199,227,244)" }}
          >
            <h3 className="text-center">Edit Profile</h3>

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
              <form onSubmit={handleUpdate}>
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
                      value={newGitHUb}
                      onChange={(e) => {
                        setNewGitHub(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-2 justify-content-center">
                  <div className="col-md-2"></div>
                  <div className="form-group col-md-3">
                    <label for="orangeHrLink">orangeHrLink</label>
                  </div>
                  <div className="form-group col-md-5">
                    <input
                      type="text"
                      className="form-control a2"
                      id="orangeHrLink"
                      value={newOrange}
                      onChange={(e) => {
                        setNewOrange(e.target.value);
                      }}
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
                      value={newPhone}
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                      }}
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
                      type="text"
                      className="form-control a2"
                      id="userJiraLink"
                      value={newJira}
                      onChange={(e) => {
                        setNewJira(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <br></br>
                <button
                  type="submit"
                  className="btn btn-primary form-control"
                  style={{ backgroundColor: "#2D033B", color: "white" }}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
