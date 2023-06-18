import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import "../css/RegisterCard.css";

const Login = () => {
  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    loginSchema: loginSchema,
    onSubmit: (values) => {
      // Handle form submission here
      axios
        .post(process.env.REACT_APP_API_URL + "/authentication/login", values)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "success",
              text: "Login success",
              icon: "success",
              confirmButtonText: "OK",
            });
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/dashboard");
          } else {
            Swal.fire({
              title: "Error",
              text: res.data.message,
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((error) => {
          alert("error");
          console.log(error);
        });
    },
  });

  return (
    <div className="justify-content-center  mt-5">
      <Card className="purple-form-card ">
        <Card.Header className="card-title text-center mt-1 mb-1">
          Login Form
        </Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <Form.Group controlId="email">
                <Form.Label
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </div>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
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
                Login
              </Button>
            </div>
          </Form>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/forgotpassword" style={{ marginLeft: "10px" }}>
              Forgot Password?
            </Link>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Or </span>
            <Link to="/register" style={{ marginLeft: "10px" }}>
              Create new account
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

function Logcard() {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "6000px",
        width: "50%",
      }}
    >
      <Login />
    </div>
  );
}

export default Logcard;
