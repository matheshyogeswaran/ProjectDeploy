import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import NavBar from "../components/Navbar";
const ProfileRate = () => {
  const { id } = useParams();

  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const handle1 = (rate: number) => {
    setRating1(rate);

    // other logic
  };
  const handle2 = (rate: number) => {
    setRating2(rate);

    // other logic
  };
  console.log(rating1);
  // Optinal callback functions
  // const onPointerEnter = () => console.log('Enter')
  // const onPointerLeave = () => console.log('Leave')
  // const onPointerMove = (value: number, index: number) => console.log(value, index)

  const submitProjectData = (e) => {
    e.preventDefault();
    const postData = {
      rating1: rating1,
      rating2: rating2,
      id: id,
    };
    axios

      .post(process.env.REACT_APP_API_URL+"/users/addRate", postData)

      .then((res) => {
        // alert(res.data.message);
        swal("Rated success", {
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      <form onSubmit={submitProjectData}>
        <h3>Technical skill</h3>
        <Rating
          onClick={handle1}
          iconsCount={10}
          // onPointerEnter={onPointerEnter}
          // onPointerLeave={onPointerLeave}
          // onPointerMove={onPointerMove}
          /* Available Props */
        />
        ` <br />
        <h3>Communication skill</h3>
        <Rating
          onClick={handle2}
          iconsCount={10}
          // onPointerEnter={onPointerEnter}
          // onPointerLeave={onPointerLeave}
          // onPointerMove={onPointerMove}
          /* Available Props */
        />
        <input
          className="m-2 btn btn-dark text-white form-control"
          type="submit"
          value="Submit Details"
        ></input>
      </form>
    </div>
  );
};
export default ProfileRate;
