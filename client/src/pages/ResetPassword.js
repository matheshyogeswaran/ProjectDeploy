import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const { email, string } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyData = {
        email:email,
        string: string,
        newPassword:newPassword
    };
    axios
      .post("http://localhost:8000/authentication/resetPassword",bodyData)
      .then((res) => {
        if(res.data.status===true){
            swal("Good job!", res.data.message, "success");
        }else{
            alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-3">
      <div className="alert alert-success" role="alert">
        <b>Hello {email}</b>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control"
          placeholder="Enter new password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <input
          type="submit"
          className="mt-3 btn btn-primary form-control"
          value="Reset Password"
        />
      </form>
    </div>
  );
};
export default ResetPassword;
