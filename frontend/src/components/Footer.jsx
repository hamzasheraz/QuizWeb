import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer
      className={`d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top bg-${props.mode}`}
    >
      <div className="col-md-4 d-flex align-items-center">
        <Link
          to="/"
          className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          <svg className="bi" width="30" height="24">
            <use href="#bootstrap"></use>
          </svg>
        </Link>
        <span
          className="text-muted"
          style={{ color: props.mode === "light" ? "black" : "white" }}
        >
          © 2023 Quiz Feista, Inc
        </span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <Link className="text-muted" to="#">
            <i
              class="fa-brands fa-x-twitter fs-3"
              style={{ color: props.mode === "light" ? "#0a0a0a" : "white" }}
            ></i>
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-muted" to="/">
            <i
              className="fa-brands fa-instagram fs-3"
              style={{ color: props.mode === "light" ? "#780f95" : "white" }}
            ></i>
          </Link>
        </li>
        <li className="ms-3">
          <Link className="text-muted" to="/">
            <i
              className="fa-brands fa-facebook fs-3"
              style={{ color: props.mode === "light" ? "#0244b6" : "white" }}
            ></i>
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
