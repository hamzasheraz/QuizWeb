import { useState, useEffect } from "react";
import UserContext from "./components/UserContext";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import axios from "axios";
import Footer from "./components/Footer";
import Quiz from "./components/Quiz";
import SignUp from "./components/SignUp";

function App() {
  const [errors, setErrors] = useState("");
  const [mode, setMode] = useState("light");
  const [quizes, setMenuData] = useState([]);
  let apiKey = process.env.REACT_APP_API_KEY;
  const [loggedIn, setLoggedIn] = useState(false);
  const [userid, setuserid] = useState();
  // Load loggedIn state from localStorage on component mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, []);

  const handleLogin = (id) => {
    setuserid(id); //id will be seent from login page
    setLoggedIn(true);
    localStorage.setItem("loggedIn", JSON.stringify(true)); // Store loggedIn state in localStorage
    localStorage.setItem("userid", id);
  };

  /*used in logout component*/
  const handleLogout = () => {
    //on logout set id null for no user
    setLoggedIn(false);
    setuserid(null);
    localStorage.removeItem("loggedIn"); // Remove loggedIn state from localStorage
    localStorage.removeItem("userid");
  };
  /*values to be passed in user context*/
  const data = {
    userid,
    loggedIn,
    handleLogin,
    handleLogout, // Add handleLogout to data
  };

  useEffect(() => {
    const continous = async () => {
      try {
        let url = await axios.get(apiKey + "/quizes/");
        setMenuData(url.data);
      } catch (err) {
        setErrors(err.message);
        console.log(errors);
      }
    };

    continous();
  }, [apiKey, errors]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quiz" element={<Home quizes={quizes} />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
