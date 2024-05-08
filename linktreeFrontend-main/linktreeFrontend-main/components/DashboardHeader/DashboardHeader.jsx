/* eslint-disable no-unused-vars */
import React from "react";
import "./dashboardHeader.css";
import "../../public/styles.css";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../src/slices/authSlice";
const DashboardHeader = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const jwtToken = localStorage.getItem("linkTreeToken");
  // const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
    axios
      .post("http://localhost:3001/data/dashboard", {
        userJwt: jwtToken,
      })
      .then(function (response) {
        if (response.data.status === "success") {
          setUserData(response.data.userDetails);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <>
      <div className="dashboardContainer">
        <div className="containerLeft">
          <Link to={`/get/${userData?.handle}`}>
            <button className="cta">Preview </button>
          </Link>
          <Link to={`/`}>
            <button className="cta">Dashboard </button>
          </Link>
          <Link to={"/edit/links"}>
            <button className="cta">Links</button>
          </Link>
          <Link to={"/edit/profile"}>
            <button className="cta">Profile</button>
          </Link>
          <Link to={"/themes/get"}>
            <button className="cta">Themes</button>
          </Link>
        </div>
        <div className="containerRight">
          <div className="porfileCta">
            <div className="profileInfoContainer">
              <div className="profileInfo">
                <p className="profileTitle">{userData?.name}</p>
              </div>
              <Link to={`/edit/profile`}>
                <div className="avtar">
                  <img src={userData?.avatar} />
                </div>
              </Link>
            </div>
            <div className="logout">
              <BiLogOut onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
