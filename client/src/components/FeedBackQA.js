import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
const FeedBackQA = ({ projectId }) => {
  const [feedBack, setFeedBack] = useState([]);
  const [feedBackId, setFeedBackId] = useState();

  const data = jwt_decode(JSON.parse(localStorage.getItem("token")))?.userData;
  const [feedback, setAddFeedBack] = useState();
  const addFeedBack = (e) => {
    e.preventDefault();
    const postData = {
      projectId: projectId,
      feedback: feedback,
      feedBy: data._id,
      feedbyName: data.fname,
    };

    axios

      .post(process.env.REACT_APP_API_URL+"/project/addFeedQA", postData)

      .then((res) => {
        if (res.data.status === true) {
          swal("Good job!", res.data.message, "success");
        } else {
          swal("Error !", res.data.message, "danger");
        }
      })
      .catch((error) => {
        swal("Sorry !", "BackEnd Error ! Try again Later !!", "info");
      });
  };
  useEffect(() => {
    axios
      .get(

        process.env.REACT_APP_API_URL+"/projects/getFeedbackQA/640748a7bfe3ac265c4127f8"

      )
      .then(function (response) {
        setFeedBack(response.data[0].feedBacksQA);
      });
  }, []);
  console.log(feedBack);

  return (
    <div>
      <div className="container mt-5 mb-5">
        <form onSubmit={addFeedBack} className="mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group">
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  placeholder="Add feedback"
                  aria-label="Add feedback"
                  aria-describedby="button-addon2"
                  value={feedback}
                  onChange={(e) => {
                    setAddFeedBack(e.target.value);
                  }}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  id="button-addon2"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="container mt-5">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Feedback</th>
                <th scope="col">Feedback by</th>
              </tr>
            </thead>
            <tbody>
              {feedBack.map((feedback) => (
                <tr key={feedback.feedId}>
                  <td>{feedback.feedback}</td>
                  <td>{feedback.feedbyName ? feedback.feedbyName : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default FeedBackQA;
