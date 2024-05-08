/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./themes.css";
import Theme from "../../../components/Theme/Theme";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";

const Themes = () => {
  const [themes, setThemes] = useState([]);
  const [palletName, setPalletName] = useState(`theme${uuidv4()}`);
  const [primary, setPrimary] = useState("#1d1d1d");
  const [secondary, setSecondary] = useState("#1d1d1d");
  const [tertiary, setTertiary] = useState("#cccccc");
  const userJwtToken = localStorage.getItem("linkTreeToken");

  useEffect(() => {
    axios
      .post("http://localhost:3001/themes/get", { jwt: userJwtToken })
      .then((response) => {
        setThemes(response.data.userThemes.themes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userJwtToken]);

  const addPallet = (e) => {
    // Validate palletName - should only contain strings
    if (typeof palletName !== "string") {
      alert("Pallet name should be a string.");
      return;
    }

    // Validate color inputs - should be valid hex codes
    const hexRegex = /^#([0-9A-F]{3}){1,2}$/i; // Regex for hex color code
    const colorInputs = [primary, secondary, tertiary];
    for (const color of colorInputs) {
      if (!hexRegex.test(color)) {
        alert(`Invalid color hex code: ${color}`);
        return;
      }
    }
    const newPallet = {
      id: 3,
      name: palletName,
      colors: [primary, secondary, tertiary],
    };
    axios
      .post("http://localhost:3001/themes/add", { newPallet, userJwtToken })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DashboardHeader />
      <div className="themesContainer">
        <div className="themesContainerLeft">
          {themes.map((theme) => {
            return <Theme styles={theme} key={uuidv4()} />;
          })}
        </div>
        <div className="themesContainerRight">
          <form>
            <p>Add Theme</p>
            <input
              type="text"
              placeholder="pallet name"
              value={palletName}
              onChange={(e) => {
                setPalletName(e.target.value);
              }}
            />
            <input
              type="color"
              placeholder="primary"
              value={primary}
              onChange={(e) => {
                setPrimary(e.target.value);
              }}
            />
            <input
              type="color"
              placeholder="secondary"
              value={secondary}
              onChange={(e) => {
                setSecondary(e.target.value);
              }}
            />
            <input
              type="color" 
              placeholder="tertiary"
              value={tertiary}
              onChange={(e) => {
                setTertiary(e.target.value);
              }}
            />
            
            <button className="cta" onClick={addPallet}>
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Themes;
