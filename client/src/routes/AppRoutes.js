import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllProjects from "../pages/AllProjects";
import Dashboard from "../pages/Dashboard";
import DashboardPM from "../pages/DashboardPM";
import Project from "../pages/Project";
import CreateProject from "../pages/CreateProject";
import FurtherProjectDetails from "../pages/FurtherProjectDetails";
import DashboardBA from "../pages/DashboardBA";
import DashboardQA from "../pages/DashboardQA";
import DashboardDEV from "../pages/DashboardDEV";
import Profile from "../pages/Profile";
import TodoList from "../pages/TodoList";
import FurtherAddProjects from "../pages/FurtherAddProjects";
import Login from "../pages/logincard";
import Register from "../pages/registercard";
import Home from "../pages/Home";
import RequireAuth from "../utils/RequireAuth";

import Admin from "../pages/Admin";
// import VerifyUser from "../pages/VerifyUser";
import AdminNotificationForm from "../pages/AdminNotificationForm";
import Announcement from "../pages/Announcement";
import AssignProjectManager from "../pages/AssignProjectManager";

import AllMembers from "../pages/AllMembers";

import PendingUserApproval from "../pages/PendingUserApproval";

import LeadBoard from "../pages/LeadBoard";
import UserNotificationList from "../pages/UserNotificationList";
import ProfileRate from "../pages/ProfileRate";
import ProjectsQA from "../pages/ProjectsQA";
import ProjectCommentQA from "../pages/ProjectCommentQA";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProfileOthers from "../pages/ProfileOthers";
import EditProfile from "../pages/EditProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Project></Project>} /> */}

        <Route
          exact
          path="/project/:projectId/:project"
          element={
            <RequireAuth>
              <Project></Project>
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/dashboardpm"
          element={
            <RequireAuth>
              <DashboardPM />
            </RequireAuth>
          }
        />
        <Route exact path="/lboard" element={<LeadBoard />} />
        <Route
          exact
          path="/allprojects"
          element={
            <RequireAuth>
              <AllProjects />
            </RequireAuth>
          }
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profiles/:id" element={<ProfileRate />} />
        <Route
          exact
          path="/users/getMembersProfile/:id"
          element={<ProfileOthers />}
        />
        <Route
          exact
          path="/furtheraddprojects"
          element={<FurtherAddProjects />}
        />
        <Route
          exact
          path="/project/:projectId/:projectName"
          element={
            <RequireAuth>
              <Project />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/project/furtherproject/:_id"
          element={
            <RequireAuth>
              <FurtherProjectDetails />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/project/createproject"
          element={
            <RequireAuth>
              <CreateProject />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/project/furtherproject"
          element={
            <RequireAuth>
              <FurtherProjectDetails />
            </RequireAuth>
          }
        />

        <Route
          exact
          path="/DashboardBA"
          element={
            <RequireAuth>
              <DashboardBA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardDEV"
          element={
            <RequireAuth>
              <DashboardDEV />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/profile/:fname"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/Todolist"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />

        <Route
          path="/announcement"
          element={
            <RequireAuth>
              <Announcement />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/AdminNotificationForm"
          element={
            <RequireAuth>
              <AdminNotificationForm />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/UserNotificationList"
          element={
            <RequireAuth>
              <UserNotificationList />{" "}
            </RequireAuth>
          }
        />

        <Route
          path="/assignprojectmanager"
          element={
            <RequireAuth>
              <AssignProjectManager />
            </RequireAuth>
          }
        />

        <Route path="/allmembers" element={<AllMembers />} />
        <Route
          path="/pending"
          element={
            <RequireAuth>
              <PendingUserApproval />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/editprofile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        {/* <Route path="/home" element={<RequireAuth><Home/></RequireAuth>} /> */}

        <Route
          exact
          path="/DashboardBA"
          element={
            <RequireAuth>
              <DashboardBA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardDEV"
          element={
            <RequireAuth>
              <DashboardDEV />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/profile/:fname"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/Todolist"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardPM"
          element={
            <RequireAuth>
              <DashboardPM />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardBA"
          element={
            <RequireAuth>
              <DashboardBA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardDEV"
          element={
            <RequireAuth>
              <DashboardDEV />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/profile/"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/Todolist"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          exact
          path="/DashboardBA"
          element={
            <RequireAuth>
              <DashboardBA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardDEV"
          element={
            <RequireAuth>
              <DashboardDEV />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/profile/:fname"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/Todolist"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/DashboardQA"
          element={
            <RequireAuth>
              <DashboardQA />
            </RequireAuth>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth access={["Admin"]}>
              <Admin />
            </RequireAuth>
          }
        />
        <Route
          path="/verifyuser"
          element={
            <RequireAuth>
              <PendingUserApproval />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/announcement"
          element={
            <RequireAuth>
              <Announcement />{" "}
            </RequireAuth>
          }
        />
        <Route
          path="/assignprojectmanager"
          element={
            <RequireAuth>
              <AssignProjectManager />
            </RequireAuth>
          }
        />
        <Route path="/allmembers" element={<AllMembers />} />
        <Route path="/pending" element={<PendingUserApproval />} />
        <Route path="/projectsQA" element={<ProjectsQA />} />
        <Route
          path="/projectscommentQA/:projectId/:projectName"
          element={<ProjectCommentQA />}
        />
        {/* <Route path="/home" element={<RequireAuth><Home/></RequireAuth>} /> */}

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/resetpassword/:email/:string"
          element={<ResetPassword></ResetPassword>}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
