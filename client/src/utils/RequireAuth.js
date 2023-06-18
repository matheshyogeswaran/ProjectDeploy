import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
const RequireAuth = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("token"));
  console.log(userData);
  const navigate = useNavigate();
  const checkTokenValidity = () => {
    if (userData) {
      axios
        .post("http://localhost:8000/authentication/verifyToken", {
          token: userData,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data?.status === false) {
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
            swal(
              "Session Time Out!",
              "Sorry, Session Time out. Login again to use the application.",
              "warning"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  if (userData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
export default RequireAuth;
