import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
// import SideBar from "../components/Sidebar";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import * as yup from "yup";

const TodoList = () => {
  
  const taskValidationSchema = yup.object().shape({
    task: yup
      .string()
      .test(
        "not-only-numbers",
        "Task should not consist only of numbers",
        (value) => {
          // Test function to check if the first name consists only of numbers
          return !/^\d+$/.test(value);
        }
      )
      .required("Task is required"),
  });

  const dueDateValidationSchema = yup.object().shape({
    dueDate: yup
      .date()
      .min(new Date(), "Due date cannot be in the past")
      .required("Due date is required"),
  });

  const userID = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData
    ._id;
  console.log("Component Rendered !");
  const [task, setTask] = useState();
  const [todoList, setTodoList] = useState(); //only containing todos
  const [todoID, setToDoID] = useState(); // contains to ID
  const [due, setDue] = useState();
  const [resetList, setResetList] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDate, setErrorMessageDate] = useState("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/todo/showusertodo/${userID}`)
      .then(function (response) {
        setToDoID(response.data[0]._id);
        setTodoList(response.data[0].tasks);
      });
  }, [resetList]);
  console.log(todoList);

  // const currentYear = new Date().getFullYear();
  // const maxDate = `${currentYear + 1}-12-31`;
  // const minDate = `${currentYear}-${currentYear.getMonth + 1}-${
  //   currentYear.getDate - 1
  // }`;

  // const addTask = (e) => {
  //   e.preventDefault();

  //   taskValidationSchema
  //     .validate({ task })
  //     .then(() => {
  //       // Validation successful, perform the task addition logic here
  //       console.log("Task added:", task);
  //       setTask("");
  //       setErrorMessage("");
  //       const postData = {
  //         userID: userID,
  //         taskName: task,
  //         dueDate: due,
  //       };

  //       axios
  //         .post(process.env.REACT_APP_API_URL + "/todo/addtask", postData)
  //         .then((res) => {
  //           if (res.data.status === true) {
  //             swal("Good job!", res.data.message, "success");
  //             setResetList(resetList + 1);
  //             setTask("");
  //             setDue("");
  //           } else {
  //             swal("Error !", res.data.message, "danger");
  //           }
  //         })
  //         .catch((error) => {
  //           swal("Sorry !", "BackEnd Error ! Try again Later !!", "info");
  //         });
  //     })
  //     .catch((error) => {
  //       // Validation failed, handle the error
  //       setErrorMessage(error.message);
  //     });
  // };

  const addTask = (e) => {
    e.preventDefault();

    taskValidationSchema
      .validate({ task })
      .then(() => {
        dueDateValidationSchema
          .validate({ dueDate: due })
          .then(() => {
            // Validation successful, perform the task addition logic here
            console.log("Task added:", task);
            console.log("Due date:", due);
            setTask("");
            setDue("");
            setErrorMessage("");
            setErrorMessageDate("");

            // Perform the task addition logic with postData here
            const postData = {
              userID: userID,
              taskName: task,
              dueDate: due,
            };

            axios
              .post(process.env.REACT_APP_API_URL + "/todo/addtask", postData)
              .then((res) => {
                if (res.data.status === true) {
                  swal("Good job!", res.data.message, "success");
                  setResetList(resetList + 1);
                } else {
                  swal("Error!", res.data.message, "danger");
                }
              })
              .catch((error) => {
                swal("Sorry!", "Backend Error! Try again later!", "info");
              });
          })
          .catch((error) => {
            // Validation failed for due date, handle the error
            setErrorMessageDate(error.message);
          });
      })
      .catch((error) => {
        // Validation failed for task, handle the error
        setErrorMessage(error.message);
      });
  };

  const markAsDone = (taskID) => {
    const postData = {
      todoid: todoID,
      taskid: taskID,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/todo/markasdone", postData)
      .then((res) => {
        if (res.data.status === true) {
          swal("Good job!", res.data.message, "success");
          setResetList(resetList + 1);
        } else {
          swal("Error !", res.data.message, "danger");
        }
      })
      .catch((error) => {
        swal("Sorry !", "BackEnd Error ! Try again Later !!", "info");
      });
  };

  const deleteTask = (taskID) => (event) => {
    event.preventDefault();

    const postData = {
      todoid: todoID,
      taskid: taskID,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/todo/deleteTask", postData)
      .then((res) => {
        if (res.data.status === true) {
          swal("Task Deleted!", res.data.message, "success");
          setResetList(resetList + 1);
        } else {
          console.log(res.data.message);
          swal("Error !", res.data.message, "danger");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const deleteTask = (taskID) => (e) => {

  //   const postData = {
  //     todoid: todoID,
  //     taskid: taskID,
  //   };

  //   axios
  //     .delete(process.env.REACT_APP_API_URL+"/todo/markasdone", postData)
  //     .then((res) => {
  //       if (res.data.status === true) {
  //         swal("Good job!", res.data.message, "success");
  //         setResetList(resetList + 1);
  //       } else {
  //         swal("Wrror !", res.data.message, "danger");
  //       }
  //     })
  //     .catch((error) => {
  //       swal("Sorry !", "BackEnd Error ! Try again Later !!", "info");
  //     });
  // };

  return (
    <div>
      <NavBar />
      <div className="container">
        {/* <div
          className="side-bar"
          style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
        >
          <SideBar />
        </div> */}
      </div>
      <div>
        <br />
        <br />

        <div className="todos">
          <div class="container">
            <h4 className="bg-dark text-white p-2 rounded">To-Do List</h4>

            <div className="addtask">
              <form onSubmit={addTask}>
                <div className="row mt-2 justify-content-md-center ">
                  <div className="col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Add a new task"
                      value={task}
                      //when user changes the value of task it update the value of the task
                      onChange={(e) => {
                        setTask(e.target.value);
                        setErrorMessage("");
                      }}
                    />
                    {errorMessage && (
                      <p className="text-danger">{errorMessage}</p>
                    )}
                  </div>

                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select Due Date"
                      onFocus={(e) => (e.target.type = "date")}
                      value={due}
                      id="dob"
                      onChange={(e) => {
                        setDue(e.target.value);
                        setErrorMessageDate("");
                      }}
                    ></input>
                    {errorMessageDate && (
                      <p className="text-danger">{errorMessageDate}</p>
                    )}
                  </div>
                  <div className="col-md-1">
                    <button
                      class="btn btn-outline-secondary"
                      type="submit"
                      id="button-addon2"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <h4>
              <br></br>To be Done
            </h4>
            <hr />

            <div>
              {/* to iterate over the array  */}
              {todoList?.map((item) => {
                if (item?.taskStatus === false) {
                  return (
                    <div className="row mt-2 justify-content-md-center">
                      <div className="col-md-5">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value={item.taskName}
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value={item.dueDate}
                        />
                      </div>
                      <div className="col-md-1">
                        <button
                          className="btn btn-outline-success"
                          onClick={() => markAsDone(item.taskid)}
                        >
                          Done
                        </button>
                      </div>
                      <div className="col-md-1">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={deleteTask(item.taskid)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <h4 className="mt-4">Completed</h4>
            <hr />
            <div>
              {todoList?.map((item) => {
                if (item?.taskStatus === true) {
                  return (
                    <div className="row mt-2 justify-content-md-center">
                      <div className="col-md-5">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value={item.taskName}
                          style={{ textDecoration: "line-through" }}
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          className="form-control"
                          type="text"
                          disabled
                          value={item.dueDate}
                          style={{ textDecoration: "line-through" }}
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
