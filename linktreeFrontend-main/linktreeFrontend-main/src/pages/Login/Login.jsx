import "./login.css";
import "../../../public/styles.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../slices/authSlice";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  function handleSubmit(e) {
    setErrorMsg("");
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "success") {
          localStorage.setItem("linkTreeToken", response.data.token);
          dispatch(login());
        } else {
          setErrorMsg(response.data.message);
        }
      })
      .catch(function (error) {
        setErrorMsg(error);
      });
  }
  return (
    <div>
      <div className="container">
        <span> Login</span>
        <form className="form">
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              name="email"
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </div>
          <button
            className="cta registerCta"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          Do not have an account?
          <Link style={{ color: "black" }} to="/register">
            Register
          </Link>
        </form>
        <div className="errorMessage">{errorMsg}</div>
      </div>
    </div>
  );
};

export default Login;
