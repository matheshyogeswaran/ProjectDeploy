import Card from "../components/Card";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import FeedBackQA from "../components/FeedBackQA";
const ProjectCommentQA = () => {
    const { projectId } = useParams();
  const { projectName } = useParams();
  return (
    <div>
      <NavBar />
      <div>
        <h1>{projectName}</h1>
      </div>
      {/* <div
        className="side-bar"
        style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
      >
        <SideBar />
      </div> */}
      <FeedBackQA projectId={projectId}/>

     
    </div>
  );
};
export default ProjectCommentQA;
