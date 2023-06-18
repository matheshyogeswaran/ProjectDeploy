import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import "../css/RegisterCard.css";

const Register = () => {
  // const backgroundImageUrl = 'https://www.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_10606469.htm#query=nature%20background&position=1&from_view=keyword&track=ais';

  // const wrapperStyle = {
  //   backgroundImage: `url(${backgroundImageUrl})`
  // };

  const validationSchema = yup.object({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    userRoleName: yup.string().required("User role name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(
        /^\d{10}$/,
        "Phone Number must be a 10-digit number without spaces or dashes"
      )
      .required("Phone Number is required"),
    orangeHrLink: yup.string().required("Orange HR Link is required"),
    GitHubUsername: yup.string().required("GitHub username is required"),
    userJiraLink: yup.string().required("User Jira Link is required"),
    password: yup.string().min(6).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userRoleName: "",
      fname: "",
      lname: "",
      email: "",
      phone: "",
      orangeHrLink: "",
      GitHubUsername: "",
      userJiraLink: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      axios
        .post(
          process.env.REACT_APP_API_URL + "/authentication/register",
          values
        )
        .then((res) => {
          alert(res.data.message);
          console.log("POST request successful");
        })
        .catch((error) => {
          alert("error");
          console.log(error);
        });
    },
  });

  return (
    <div className="container my-form mt-4 ">
      <Card className="purple-form-card ">
        <Card.Header className="card-title text-center mt-1 mb-1">
          Register
        </Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md">
                <Form.Group controlId="fname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.fname && formik.errors.fname}
                  />
                  {formik.touched.fname && formik.errors.fname && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.fname}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>

              <div className="col-md">
                <Form.Group controlId="lname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.lname && formik.errors.lname}
                    // required
                  />
                  {formik.touched.lname && formik.errors.lname && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.lname}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md">
                <Form.Group controlId="userRoleName">
                  <Form.Label>User Role Name</Form.Label>
                  <Form.Select
                    name="userRoleName"
                    value={formik.values.userRoleName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.userRoleName && formik.errors.userRoleName
                    }
                  >
                    <option value="">Select Role</option>
                    <option value="developer">Developer</option>
                    <option value="BA">BA</option>
                    <option value="QA">QA</option>
                    <option value="ProjectManager">Project Manager</option>
                    <option value="Techlead">Tech Lead</option>
                    {/* admin - login */}
                  </Form.Select>
                  {formik.touched.userRoleName &&
                    formik.errors.userRoleName && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.userRoleName}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>
              </div>

              <div className="col-md">
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && formik.errors.email}
                    // required
                    unique
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md">
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.phone && formik.errors.phone}
                    // required
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.phone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>

              <div className="col-md">
                <Form.Group controlId="orangeHrLink">
                  <Form.Label>Orange HR Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="orangeHrLink"
                    value={formik.values.orangeHrLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.orangeHrLink && formik.errors.orangeHrLink
                    }
                    // required
                  />
                  {formik.touched.orangeHrLink &&
                    formik.errors.orangeHrLink && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.orangeHrLink}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md">
                <Form.Group controlId="GitHubUsername">
                  <Form.Label>GitHub username</Form.Label>
                  <Form.Control
                    type="text"
                    name="GitHubUsername"
                    value={formik.values.GitHubUsername}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.GitHubUsername &&
                      formik.errors.GitHubUsername
                    }
                    // required
                  />
                  {formik.touched.GitHubUsername &&
                    formik.errors.GitHubUsername && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.GitHubUsername}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>
              </div>
              <div className="col-md">
                <Form.Group controlId="userJiraLink">
                  <Form.Label>User Jira Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="userJiraLink"
                    value={formik.values.userJiraLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.userJiraLink && formik.errors.userJiraLink
                    }
                    // required
                    style={{ width: "100%" }}
                  />
                  {formik.touched.userJiraLink &&
                    formik.errors.userJiraLink && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.userJiraLink}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md">
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    // required
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </div>
              <div className="col-md">
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    // required
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>
              </div>
            </div>

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
                Register
              </Button>
            </div>
          </Form>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>Have already an account?</span>
            <Link to="/login" style={{ marginLeft: "5px" }}>
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
