import React from "react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "80px" }}>
      <header className={classes.header}>
        <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Puzzle Mania
        </h1>
      </header>
    </div>
  );
};

export default Header;
