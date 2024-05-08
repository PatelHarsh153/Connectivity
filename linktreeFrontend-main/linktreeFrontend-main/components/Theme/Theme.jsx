/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./theme.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const Theme = (props) => {
  const jwt = localStorage.getItem("linkTreeToken");
  const applyTheme = (style) => {
    axios
      .post("http://localhost:3001/themes/change", {
        theme: style,
        jwtToken: jwt,
      })
      .then((response) => {
        if (response.data.status == "success") {
          alert("theme changed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTheme = (e) => {
    axios
      .post("http://localhost:3001/themes/delete", {
        id: e.target.id,
        userJwtToken: jwt,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status == "success") {
          window.location.reload();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="themeContainer">
      <div className="themeName">{props.styles.name}</div>
      <div className="colorPallet">
        {props.styles.colors.map((color) => {
          return (
            <div className="colorPalletContainer" key={uuidv4()}>
              <div
                className="color"
                style={{ backgroundColor: `${color}` }}
              ></div>
              
            </div>
          );
        })}
      </div>
      <button
        className="cta applyCta"
        onClick={() => {
          applyTheme(props.styles);
        }}
      >
        Apply
      </button>
      <button
        className="cta"
        id={props.styles._id}
        onClick={(e) => {
          deleteTheme(e);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Theme;
