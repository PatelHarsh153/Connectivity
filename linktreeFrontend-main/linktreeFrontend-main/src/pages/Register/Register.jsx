import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    setErrorMsg("");
    try {
      e.preventDefault();

      axios
        .post("http://localhost:3001/auth/register", {
          email: email,
          password: password,
          handle: handle,
        })
        .then(function (response) {
          if (response.data.status === "success") {
            localStorage.setItem("linkTreeToken", response.data.token);
            navigate("/login");
          } else {
            setErrorMsg(response.data.message);
          }
        });
    } catch (error) {
      setErrorMsg(error);
      console.log(errorMsg);
    }
  }

  return (
    <div>
      <div className="container">
        <span>Register</span>
        <form className="form">
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(
                  (e.target.value = ("" + e.target.value).toLowerCase())
                );
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
          <div className="formGroup">
            <label htmlFor="handle">Handle</label>
            <input
              type="text"
              name="handle"
              onChange={(e) => {
                setHandle(
                  (e.target.value = ("" + e.target.value).toLowerCase())
                );
              }}
              value={handle}
              required
            />
          </div>
          <button
            className="cta registerCta"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
          Alredy have an account?{" "}
          <Link style={{ color: "black" }} to="/login">
            Login
          </Link>
        </form>
        <div className="errorMessage">{errorMsg}</div>
      </div>
    </div>
  );
};

export default Register;
