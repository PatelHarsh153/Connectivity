/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./editProfile.css";
import DashboardHeader from "../../../components/DashboardHeader/DashboardHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [youtube, setYoutube] = useState("");

  const jwtToken = localStorage.getItem("linkTreeToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3001/edit/profile", {
        jwtToken: jwtToken,
      })
      .then(function (response) {
        if (response.data.status !== "success") {
          navigate("/login");
        }

        setName(response.data.userData.name);
        setBio(response.data.userData.bio);
        setAvatar(response.data.userData.avatar);
        setFacebook(response.data.userData.social.facebook);
        setTwitter(response.data.userData.social.twitter);
        setGithub(response.data.userData.social.github);
        setInstagram(response.data.userData.social.instagram);
        setLinkedIn(response.data.userData.social.linkedin);
        setYoutube(response.data.userData.social.youtube);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function handleProfileSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/edit/profile", {
        name: name,
        bio: bio,
        avatar: avatar,
        jwtToken: jwtToken,
      })
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }
  function handleSocialsSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/edit/socials", {
        socials: {
          facebook: `${facebook}`,
          twitter: `${twitter}`,
          github: `${github}`,
          instagram: `${instagram}`,
          linkedin: `${linkedIn}`,
          youtube: `${youtube}`,
        },
        jwtToken: jwtToken,
      })
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error);
      });
  }
  return (
    <>
      <DashboardHeader />
      <div className="editProfileContainer">
        <div className="editProfileContainerInner">
          <div className="editUserInfo">
            <p className="editUserSocialsTitle">Edit User Profile</p>
            <form action="">
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <input
                type="text"
                placeholder="bio"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
              />
              <input
                type="text"
                placeholder="avatar"
                onChange={(e) => {
                  setAvatar(e.target.value);
                }}
                value={avatar}
              />
              <button
                type="submit"
                className="cta"
                onClick={handleProfileSubmit}
              >
                Save Profile
              </button>
            </form>
          </div>
          <div className="editUserSocials">
            <p className="editUserSocialsTitle">Edit User Socials</p>
            <form>
              <input
                type="text"
                placeholder="Facebook"
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
                value={facebook}
              />
              <input
                type="text"
                placeholder="Twitter"
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
                value={twitter}
              />
              <input
                type="text"
                placeholder="Instagram"
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
                value={instagram}
              />
              <input
                type="text"
                placeholder="Youtube"
                onChange={(e) => {
                  setYoutube(e.target.value);
                }}
                value={youtube}
              />
              <input
                type="text"
                placeholder="LinkedIn"
                onChange={(e) => {
                  setLinkedIn(e.target.value);
                }}
                value={linkedIn}
              />
              <input
                type="text"
                placeholder="Github"
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
                value={github}
              />

              <button
                type="submit"
                className="cta"
                onClick={handleSocialsSubmit}
              >
                Save Socials
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
