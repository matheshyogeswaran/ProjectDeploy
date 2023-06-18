import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPassword = (e) => {
    e.preventDefault();

    // Make a POST request to the API endpoint with the email as the payload
    axios
      .post("http://localhost:8000/authentication/forgotpassword", {
        email: email,
      })
      // If the request is successful, show the message returned by the API in an alert
      .then((res) => {
        alert(res.data.message);
      })
      // If the request fails, show an error message in an alert and log the error to the console
      .catch((error) => {
        alert("error");
        console.log(error);
      });

    // Return a form with an input field for the user to enter their email and a button to submit the form
    return (
      <form onSubmit={forgotPassword}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5 className="card-title text-center">Reset your password</h5>
              <Form onSubmit={forgotPassword}>
                <Form.Group controlId="email">
                  <Form.Label style={{ marginTop: "10px" }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    unique
                  />
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
