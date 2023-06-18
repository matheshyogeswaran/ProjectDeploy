import NavBar from "../components/Navbar";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import React from 'react';
import AdminNotificationForm from './AdminNotificationForm';

const Admin = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      

      <Row className="justify-content-center flex-column flex-md-row">
        <Col xs="auto" className="mb-2 mb-md-0">
          
          <Link to="/pending">
            <Button variant="primary" size="lg">
              Verify New Users
            </Button>
          </Link>
        </Col>

        <Col xs="auto" className="mb-2 mb-md-0">
          
          <Link to="http://localhost:3000/AdminNotificationForm">
            <Button variant="primary" size="lg">
              Make Announcement
            </Button>
          </Link>
        </Col>
        <Col xs="auto" className="mb-2 mb-md-0">
          {/* <Link to="/assignprojectmanager">
            <Button variant="dark" size="lg">
              Assign Project Manager
            </Button>
          </Link> */}
        </Col>
      </Row>
    </>
  );
};
export default Admin;
