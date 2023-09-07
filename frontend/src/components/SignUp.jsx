import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, matchpassword] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password && email && repassword) {
      if (password === repassword) {
        axios
          .post("http://127.0.0.1:8000/signup/", { username, password, email })
          .then((response) => {
            if (response.data.status) {
              showAlert("Account Created", "success");
              navigate("/quiz");
            } else {
            }
            /* set state true to show user dashboard*/
          })
          .catch((error) => {
            //   seterror(true);
            showAlert("Re enter your details", "danger");
          });
      } else {
        showAlert("Enter correct re password", "danger");
      }
    }
  };

  const handleemail = (e) => {
    setEmail(e.target.value);
  };

  const handleagainpassword = (e) => {
    matchpassword(e.target.value);
  };

  const handleusername = (e) => {
    setusername(e.target.value);
  };
  const handlepassword = (e) => {
    setpassword(e.target.value);
  };

  return (
    <>
      <Alert alert={alert} />
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          <p className="text-center">Get started with your free account</p>
          <p>
            <Link to="" className="btn btn-block btn-twitter">
              {" "}
              <i className="fab fa-twitter"></i> &nbsp; Login via Twitter
            </Link>
            <Link to="" className="btn btn-block btn-facebook">
              {" "}
              <i className="fab fa-facebook-f"></i> &nbsp; Login via facebook
            </Link>
          </p>
          <p className="divider-text">
            <span className="bg-light">OR</span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="Username"
                id="username"
                value={username}
                onChange={handleusername}
                type="text"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={handleemail}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Create password"
                type="password"
                id="password"
                value={password}
                onChange={handlepassword}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Repeat password"
                type="password"
                id="password1"
                value={repassword}
                onChange={handleagainpassword}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success btn-block">
                {" "}
                Create Account{" "}
              </button>
            </div>
            <p className="text-center">
              Have an account? <Link to="/">Log In</Link>{" "}
            </p>
          </form>
        </article>
      </div>
    </>
  );
};

export default SignUp;
