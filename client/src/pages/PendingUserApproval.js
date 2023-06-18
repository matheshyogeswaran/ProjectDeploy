import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import NavBar from "../components/Navbar";

const PendingUserApproval = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users/usersToApproved")
      .then((response) => {
        setUnverifiedUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(unverifiedUsers);

  const convertToTimeStamp = (timestamp) => {
    var myDate = new Date(timestamp * 1000);
    // return(myDate.toLocaleString());
    return timestamp;
  };

  const removeUserFromList = (userID) => {
    setUnverifiedUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userID)
    );
  };

  const verification = (result, userID, email) => {
    const postData = {
      result: result,
      userid: userID,
    };

    var message = "";
    if (result === "allow") {
      message = "Do you want to allow this user to access ?";
    } else {
      message = "Do you want delete this user from the system permanently ?";
    }

    swal({
      title: "Confirm",
      text: message,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(process.env.REACT_APP_API_URL + "/users/verifyuser", postData)
          .then((res) => {
            console.log(res.data);
            swal({
              icon: "success",
              text: res.data.message,
            });
          })
          .catch((error) => {
            console.log(error);
            swal({
              icon: "warning",
              text: "Error",
            });
          });

        if (result === "allow") {
          axios
            .get(`http://localhost:8000/sendmailTo/${email}/${result}`)
            .then((response) => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios
            .get(`http://localhost:8000/sendmailTo/${email}/${result}`)
            .then((response) => {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }

        removeUserFromList(userID); // Remove the user from the list
      } else {
        swal("Action Terminated.", {
          icon: "success",
        });
      }
    });
  };

  return (
    <React.Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="form-control mt-3 bg-dark text-white">
          Users Requests
        </div>
        <table className="mt-3 table table-striped">
          <thead>
            <tr>
              {/* <th scope="col">Image</th> */}
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">User Role</th>
              <th scope="col">Requested On</th>
              <th scope="col">Contact</th>
              <th scope="col">Allow</th>
              <th scope="col">Deny</th>
            </tr>
          </thead>
          <tbody>
            {unverifiedUsers.map((item) => {
              return (
                <tr className="align-middle" key={item._id}>
                  {/* <th scope="row"><img draggable={false} className="rounded-circle" style={{ "width": "40px" }} alt="user" src={item?.image}></img></th> */}
                  <th>{item?.fname}</th>
                  <th>{item?.lname}</th>
                  <td>{item?.userRoleName}</td>
                  <td>{convertToTimeStamp(item?.submittedOn)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-info form-control"
                    >
                      Contact
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        verification("allow", item?._id, item?.email)
                      }
                      type="button"
                      className="btn btn-outline-success form-control"
                    >
                      Allow
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        verification("deny", item?._id, item?.email)
                      }
                      type="button"
                      className="btn btn-outline-danger form-control"
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default PendingUserApproval;
