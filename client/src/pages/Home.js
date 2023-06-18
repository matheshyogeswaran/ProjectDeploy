import { Navigate, useNavigate } from "react-router-dom";

const Home = ()=>{
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        navigate("/")
    }
    return(
        <>
            <h1>Home Page</h1>
            <button type="button" onClick={logout}>Logout</button>
        </>
    )
}
export default Home