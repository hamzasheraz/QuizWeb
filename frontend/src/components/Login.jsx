import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import UserContext from "../UserContext";
import "../css/login.css";
import Alert from "./Alert";

const Login = () => {
  const navigate = useNavigate();
  /**Variable in Login function  */
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  /*Sending data to backend */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      axios
        .post("http://127.0.0.1:8000/login/", { username, password })
        .then((response) => {
          if (response.data.status) {
            // showAlert("Logined Successfully", "success");
            setLoggedIn(true);
            seterror(false);
            navigate("/quiz");
          } else {
            seterror(true);
          }
          /* set state true to show user dashboard*/
        })
        .catch((error) => {
          seterror(true);
          showAlert("Invalid Credentials", "danger");
        });
    }
  };
  /*Handle functions  */
  const handleusername = (e) => {
    setusername(e.target.value);
  };
  const handlepassword = (e) => {
    setpassword(e.target.value);
  };
  return (
    <>
      <Alert alert={alert} />
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleusername}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlepassword}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup/" className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
