import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import NavBar from "../components/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  clientName: Yup.string().required("Client Name is required"),
  clientAddress: Yup.string().required("Client Address is required"),
  clientPhone: Yup.string()
    .matches(
      /^\d{10}$/,
      "Phone Number must be a 10-digit number without spaces or dashes"
    )
    .required("Phone Number is required"),
  gitHubLink: Yup.string().required("GitHub Link is required"),
  jiraLink: Yup.string().required("JIRA Link is required"),
});

const FurtherProjectDetails = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [contributorsData, setContributorsData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users/getContributors")
      .then(function (response) {
        setContributorsData(response.data);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      gitHubLink: "",
      jiraLink: "",
      contributors: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const postData = {
        clientName: values.clientName,
        clientAddress: values.clientAddress,
        clientPhone: values.clientPhone,
        gitHubLink: values.gitHubLink,
        jiraLink: values.jiraLink,
        projectId: _id,
        contributors: values.contributors,
      };

      axios
        .post(
          process.env.REACT_APP_API_URL + "/projects/addExtraProjDetails",
          postData
        )
        .then((res) => {
          alert(res.data.message);
          Swal.fire({
            title: "Success",
            text: "Project Details added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/dashboard");
    },
  });

  return (
    <React.Fragment>
      <NavBar />
      <div className="container mt-3">
        <div className="card shadow shadow-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="card-body mt-3">
              <div className="row m-2">
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.clientName && formik.errors.clientName
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Client Name"
                      id="clientName"
                      {...formik.getFieldProps("clientName")}
                    />
                    <label htmlFor="clientName">Client Name</label>
                    {formik.touched.clientName && formik.errors.clientName && (
                      <div className="invalid-feedback">
                        {formik.errors.clientName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.clientAddress &&
                        formik.errors.clientAddress
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Client Address"
                      id="clientAddress"
                      {...formik.getFieldProps("clientAddress")}
                    />
                    <label htmlFor="clientAddress">Client Address</label>
                    {formik.touched.clientAddress &&
                      formik.errors.clientAddress && (
                        <div className="invalid-feedback">
                          {formik.errors.clientAddress}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row m-2">
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.clientPhone && formik.errors.clientPhone
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Client Phone"
                      id="clientPhone"
                      {...formik.getFieldProps("clientPhone")}
                    />
                    <label htmlFor="clientPhone">Client Phone</label>
                    {formik.touched.clientPhone &&
                      formik.errors.clientPhone && (
                        <div className="invalid-feedback">
                          {formik.errors.clientPhone}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.gitHubLink && formik.errors.gitHubLink
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="GitHub Link"
                      id="gitHubLink"
                      {...formik.getFieldProps("gitHubLink")}
                    />
                    <label htmlFor="gitHubLink">GitHub Link</label>
                    {formik.touched.gitHubLink && formik.errors.gitHubLink && (
                      <div className="invalid-feedback">
                        {formik.errors.gitHubLink}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.jiraLink && formik.errors.jiraLink
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="JIRA Link"
                      id="jiraLink"
                      {...formik.getFieldProps("jiraLink")}
                    />
                    <label htmlFor="jiraLink">JIRA Link</label>
                    {formik.touched.jiraLink && formik.errors.jiraLink && (
                      <div className="invalid-feedback">
                        {formik.errors.jiraLink}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <Select
                      isMulti
                      name="contributors"
                      value={formik.values.contributors}
                      onChange={(selectedOptions) =>
                        formik.setFieldValue(
                          "contributors",
                          selectedOptions || []
                        )
                      }
                      options={contributorsData}
                      classNamePrefix="select contributors"
                    />
                    <label htmlFor="contributors">Contributors</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-6">
                  <input
                    className="m-2 btn btn-dark text-white form-control"
                    type="submit"
                    value="Submit Details"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="m-2 btn btn-dark text-white form-control"
                    type="reset"
                    value="Reset"
                    onClick={() => formik.resetForm()}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default FurtherProjectDetails;
