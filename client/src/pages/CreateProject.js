import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NavBar from "../components/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateProject = () => {
  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const [techLeadData, setTechLeadData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users/getTechLead")
      .then(function (response) {
        setTechLeadData(response.data);
      });
  }, []);

  const projectManager = data?._id;

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    technology: Yup.string().required("Technology is required"),
    deadline: Yup.date()
      .required("Deadline is required")
      .min(new Date(), "Deadline must be a future date")
      .transform((currentValue, originalValue) => {
        if (originalValue.length === 10) {
          const [year, month, day] = originalValue.split("-");
          return new Date(year, month - 1, day);
        }
        return originalValue;
      })
      .typeError("Invalid date format"),
    techlead: Yup.string().required("Techlead is required"),
  });

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      technology: "",
      deadline: "",
      techlead: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const postData = {
        projectName: values.projectName,
        description: values.description,
        technology: values.technology,
        deadline: values.deadline,
        techlead: values.techlead,
        projectManager: projectManager,
      };

      axios
        .post(
          process.env.REACT_APP_API_URL + "/projects/addBasicProjDetails",
          postData
        )
        .then((res) => {
          alert(res.data.message);
          swal("Project Created", {
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <React.Fragment>
      <div>
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
                        className="form-control"
                        placeholder="Project Name"
                        id="projectname"
                        {...formik.getFieldProps("projectName")}
                      />
                      <label htmlFor="projectname">Project Name</label>
                      {formik.touched.projectName &&
                      formik.errors.projectName ? (
                        <div className="error">{formik.errors.projectName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        id="description"
                        {...formik.getFieldProps("description")}
                      />
                      <label htmlFor="description">Description</label>
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <div className="error">{formik.errors.description}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row m-2">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Technology"
                        id="technology"
                        {...formik.getFieldProps("technology")}
                      />
                      <label htmlFor="technology">Technology</label>
                      {formik.touched.technology && formik.errors.technology ? (
                        <div className="error">{formik.errors.technology}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Deadline"
                        onFocus={(e) => (e.target.type = "date")}
                        id="deadline"
                        {...formik.getFieldProps("deadline")}
                      />
                      <label htmlFor="deadline">Select Deadline</label>
                      {formik.touched.deadline && formik.errors.deadline ? (
                        <div className="error">{formik.errors.deadline}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row m-2">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <select
                        id="techlead"
                        className="form-control"
                        {...formik.getFieldProps("techlead")}
                      >
                        <option value="" disabled>
                          Select Techlead
                        </option>
                        {techLeadData.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.fname + " " + item.lname}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="techlead">Select Techlead</label>
                      {formik.touched.techlead && formik.errors.techlead ? (
                        <div className="error">{formik.errors.techlead}</div>
                      ) : null}
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
                      onClick={formik.handleReset}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default CreateProject;
