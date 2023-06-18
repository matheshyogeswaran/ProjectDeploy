import React from "react";
import {
  IoMdBookmark,
  IoMdCall,
  IoMdChatboxes,
  IoMdClipboard,
  IoMdClose,
  IoMdHammer,
  IoMdHome,
  IoMdImage,
  IoMdMenu,
  IoMdPerson,
} from "react-icons/io";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Sidebar.css";
function SideBar() {
  return (
    <nav className="h-100" style={{ backgroundColor: "rgb(59,73,104)" }}>
      <ul className="ul-item oicon p-0 m-0 h-100 d-flex flex-column justify-content-center">
        <li>
          <IoMdHome className="icon" />
          <Link to="/"></Link>
        </li>

        <li>
          <IoMdClipboard className="icon" />
          <Link to="/UserNotificationList"></Link>
        </li>

        <li>
          <IoMdChatboxes className="icon" />
          <Link to="/"></Link>
        </li>

        <li>
          <IoMdHammer className="icon" />
          <Link to="/"></Link>
        </li>

        <li>
          <IoMdCall className="icon" />
          <Link to="/"></Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
