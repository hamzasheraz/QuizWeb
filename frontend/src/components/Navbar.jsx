import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h3>Quiz Feista </h3>
        </Link>
        <i
          className="fas fa-solid fa-moon"
          role="button"
          onClick={props.toggleMode}
          style={{
            color: props.mode === "light" ? "#04033a" : "white",
            fontSize: "2rem",
          }}
        ></i>
      </div>
    </nav>
  );
}

export default Navbar;
