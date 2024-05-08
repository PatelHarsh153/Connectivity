/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./link.css";
import "../../public/styles.css";
import { Link as Link1 } from "react-router-dom";
import { motion } from "framer-motion";

const Link = ({ linkData, colors }) => {
  console.log(colors);
  return (
    <>
      <motion.div
        className="link"
        animate={{ y: 10 }}
        style={{ backgroundColor: colors[2] }}
      >
        <Link1
          to={`https://${linkData.url}`}
          target="_blank"
          style={{
            color: "inherit",
            textDecoration: "inherit",
          }}
        >
          <div className="linkTitle" style={{ color: colors[1] }}>
            {linkData.title}
          </div>
        </Link1>
      </motion.div>
    </>
  );
};

export default Link;
