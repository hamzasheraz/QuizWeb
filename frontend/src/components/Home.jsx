import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

const Home = ({ quizes }) => {
  let apiKey = process.env.REACT_APP_API_KEY;

  return (
    <>
      <section className="d-flex flex-wrap justify-content-around align-items-center my-4">
        {quizes.map((currElem) => {
          const { id, title, description, image } = currElem;
          return (
            <div className="card my-4" style={{ width: "18rem" }} key={id}>
              <img src={apiKey + image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <Link to={`/quiz/${id}`} className="btn btn-danger">
                  Start Quiz
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Home;
