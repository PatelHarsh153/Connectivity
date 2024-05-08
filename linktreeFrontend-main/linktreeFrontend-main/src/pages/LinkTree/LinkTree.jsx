/* eslint-disable no-unused-vars */
import React from "react";
import "./linkTree.css";
import "../../../public/styles.css";
import Link from "../../../components/Link/Link";
import { Link as Link1 } from "react-router-dom";
import { FcShare } from "react-icons/fc";
import Socialmedia from "../../../components/Socialmedia/Sociamedia";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
export const LinkTree = (data) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const avatar = data.data.userData?.avatar;
  const name = data.data.userData?.name;
  const link = data.data.userData?.link;
  const socialLinks = data.data.userData?.social;
  const bio = data.data.userData?.bio;
  const primary = data.data.userData?.currentTheme?.colors[0];
  const secondary = data.data.userData?.currentTheme?.colors[1];
  const tertiary = data.data.userData?.currentTheme?.colors[2];

  function hamdleShare() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link Copied!");
  }
  return (
    <>
      <div className="linktreeContainer" style={{ backgroundColor: primary }}>
        {console.log(isAuthenticated)}
        {!isAuthenticated ? (
          <Link1
            to={"/register"}
            className="getYourOwnLinkTree"
            style={{ color: tertiary }}
          >
            Get Your Own Connectivity
          </Link1>
        ) : (
          <></>
        )}

        <div className="linktreeContainerInner">
          <div className="avatarContainer">
            <img src={avatar} alt="user avatar" className="avatar" />
          </div>

          <p className="userhandle">
            {name}
          </p>
          <p className="userdes">{bio}             <FcShare onClick={hamdleShare} className="shareBtn" />
          </p>
          <div className="socialmediaContainerMain">
            <Socialmedia
              socialData={socialLinks ? socialLinks[0] : ""}
              colors={[primary, secondary, tertiary]}
           
           />
            
          </div>

          <div className="linkContainer">
            {link?.map((item) => {
              if ((item.url && item.title) != "") {
                return (
                  <Link
                    key={uuidv4()}
                    linkData={item}
                    colors={[primary, secondary, tertiary]}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
