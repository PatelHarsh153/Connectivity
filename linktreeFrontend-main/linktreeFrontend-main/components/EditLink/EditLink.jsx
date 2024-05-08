/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./editLink.css";
import axios from "axios";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { useNavigate } from "react-router-dom";
export const EditLink = () => {
  const [links, setLinks] = useState([
    { title: "default", url: "default.com" },
  ]);

  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("linkTreeToken");
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
          setLinks(response.data.userDetails.links);
        } else {
          if (response.data.status !== "success") {
            navigate("/login");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let handleChange = (i, e) => {
    let newFormValues = [...links];
    newFormValues[i][e.target.name] = e.target.value;
    setLinks(newFormValues);
  };

  let addFormFields = (e) => {
    if (
      links[links.length - 1].title !== "" &&
      links[links.length - 1].url !== ""
    ) {
      setLinks([...links, { title: "", url: "" }]);
    }
  };

  let removeFormFields = (i) => {
    let newFormValues = [...links];
    newFormValues.splice(i, 1);
    setLinks(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/edit/links", {
        links: links,
        userJwt: jwtToken,
      })
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div className="editLinkContainer">
      <DashboardHeader />
      <div className="editLinkContainerInner">
        {links.map((element, index) => (
          <div className="form-inline" key={index}>
            <div className="form-inline-inner">
              <div>
                <label>Title</label>
                <input
                  required
                  type="text"
                  name="title"
                  value={element.title || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label>Url</label>
                <input
                  required
                  type="text"
                  name="url"
                  value={element.url || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            {index ? (
              <button
                type="button"
                className="cta remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <button className="cta" type="button" onClick={() => addFormFields()}>
            Add
          </button>
          <button className="cta" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
