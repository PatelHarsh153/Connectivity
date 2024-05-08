import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LinkTree } from "./LinkTree/LinkTree";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useSelector } from "react-redux";

const DynamicRoute = () => {
  const [userData, setUserData] = useState({});
  const params = useParams();
  const jwtToken = localStorage.getItem("linkTreeToken");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (params.linktree) {
      axios
        .get(`http://localhost:3001/get/${params.linktree}`, {
          headers: { jwtToken: jwtToken },
        })
        .then(function (response) {
          if (response.data.status === "success") {
            setUserData(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  if (!isAuthenticated) {
    return (
      <>
        <LinkTree data={userData} />
      </>
    );
  } else {
    return (
      <>
        <DashboardHeader
          handle={userData.userData?.handle}
          name={userData.userData?.name}
          avatar={userData.userData?.avatar}
        />
        <LinkTree data={userData} />
      </>
    );
  }
};

export default DynamicRoute;
