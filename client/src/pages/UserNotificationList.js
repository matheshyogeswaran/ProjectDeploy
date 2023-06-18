import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Nav } from "react-bootstrap";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import jwt_decode from "jwt-decode";
// const socket = io(); // Connect to the socket.io server

const UserNotificationList = () => {
  const [updateList, setUpdateList] = useState(0);
  const userID = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData
    ._id;
  const [notifications, setNotifications] = useState([]);
  const [notificationsAll, setNotificationsAll] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/getUserNotifications/${userID}`)
      .then((response) => {
        setNotifications([]);
        setNotifications(response.data[0].notification);
      });

    axios.get(`http://localhost:8000/notifications`).then((response) => {
      setNotificationsAll([]);
      setNotificationsAll(response.data);
    });
    const interval = setInterval(() => {
      console.log("halo halo");
      axios
        .get(`http://localhost:8000/users/getUserNotifications/${userID}`)
        .then((response) => {
          setNotifications([]);
          setNotifications(response.data[0].notification);
        });

      axios.get(`http://localhost:8000/notifications`).then((response) => {
        setNotificationsAll([]);
        setNotificationsAll(response.data);
      });
    }, 1000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateStatus = (id) => {
    axios
      .post("http://localhost:8000/users/updateNotificationStatus", {
        nid: id,
        userID: userID,
      })
      .then((response) => {
        if (response.data.status) {
          alert(response.data.message);
          setNotifications([]);
          setUpdateList(updateList + 1);
        }
      });
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className="container">
        {
          // <div
          //   className="side-bar"
          //   style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
          // >
          //   <SideBar />
          // </div>
        }
        <h1 className="text-center">Notifications</h1>
        <div>
          <h2>New </h2>
          {notifications?.map((notification) => {
            return notification?.status === false ? (
              <div
                key={notification?._id}
                class="alert alert-primary"
                role="alert"
              >
                {notification?.message} &nbsp;&nbsp;&nbsp;
                <button
                  onClick={() => {
                    updateStatus(notification?._id);
                  }}
                >
                  Seen
                </button>
              </div>
            ) : null;
          })}
          <h2>Earlier</h2>
          {notifications?.map((notification) =>
            notification?.status === true ? (
              <div
                key={notification?.timeDate}
                class="alert alert-primary"
                role="alert"
              >
                {notification?.message} &nbsp;&nbsp;&nbsp;
              </div>
            ) : null
          )}
          <h2>Broadcast</h2>
          {notificationsAll.map((item) => (
            <div class="alert alert-primary" role="alert">
              <div key={item._id}>
                <p>{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNotificationList;
