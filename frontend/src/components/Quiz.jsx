import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/quiz.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { id } = useParams();
  const [questionsQuiz, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(0)); // Initialize with an empty array
  const [submittedAnswers, setSubmittedAnswers] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [unansweredQuestionsCount, setUnansweredQuestionsCount] = useState(0);
  const [finalScore, updateFinal] = useState(0);
  let apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const continuous = async () => {
      try {
        let url = await axios.get(apiKey + "/quizes/" + id);
        setQuestions(url.data.questions);
        setSelectedOptions(new Array(url.data.questions.length).fill(null));
      } catch (err) {
        console.log(err);
      }
    };
    continuous();
  }, [apiKey, id]);

  const handleOptionSelect = (optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate the summary of submitted answers
    const summary = questionsQuiz.map((question, index) => {
      const selectedOptionIndex = selectedOptions[index];
      const selectedAnswer =
        selectedOptionIndex !== null && selectedOptionIndex !== undefined
          ? question.choices[selectedOptionIndex].text
          : "Not answered";

      // Check if the answer is correct or wrong

      const isCorrect =
        selectedOptionIndex !== null &&
        question.choices[selectedOptionIndex].is_correct === true;

      // Update the counts
      if (isCorrect) {
        updateFinal((count) => count + 2);
        setCorrectAnswersCount((count) => count + 1);
      } else if (selectedOptionIndex !== null) {
        if (finalScore > 0) updateFinal((count) => count - 2);
        setWrongAnswersCount((count) => count + 1);
      } else {
        updateFinal((count) => count - 1);
        setUnansweredQuestionsCount((count) => count + 1);
      }

      return {
        question: question.text,
        selectedAnswer,
        isCorrect,
      };
    });
    setSubmittedAnswers(summary);
    setQuizCompleted(true); // Mark the quiz as completed
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderOptions = () => {
    const currentQuestion = questionsQuiz[currentQuestionIndex];
    return currentQuestion?.choices.map((choice, index) => (
      <label className="options" key={index}>
        {choice.text}
        <input
          type="radio"
          name="radio"
          checked={selectedOptions[currentQuestionIndex] === index}
          onChange={() => handleOptionSelect(index)}
        />
        <span className="checkmark"></span>
      </label>
    ));
  };

  return (
    <>
      <div className="container mt-sm-5 my-1">
        <div className="question ml-sm-5 pl-sm-5 pt-2">
          {submittedAnswers ? (
            <div className="submitted-answers">
              <h2>Submitted Answers Summary</h2>
              <ul>
                {submittedAnswers.map((answer, index) => (
                  <li key={index}>
                    <strong>Question:</strong> {answer.question}
                    <br />
                    <strong>Answer:</strong> {answer.selectedAnswer}
                  </li>
                ))}
              </ul>
              <div className="d-flex">
                <div>
                  Final Score: <strong>{finalScore}</strong>
                </div>
                <div>
                  Correct Answers: <strong>{correctAnswersCount}</strong>
                </div>
                <div>
                  Wrong Answers: <strong>{wrongAnswersCount}</strong>
                </div>
                <div className="mr-2">
                  Unanswered Questions:{" "}
                  <strong>{unansweredQuestionsCount}</strong>
                </div>
                <Link to={`/quiz`} className="btn btn-danger">
                  Go back to Quiz Page
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                Question {currentQuestionIndex + 1} out of{" "}
                {questionsQuiz.length}
              </div>
              <div className="py-2 h5">
                <b>{questionsQuiz[currentQuestionIndex]?.text}</b>
              </div>
              <div
                className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3"
                id="options"
              >
                {renderOptions()}
              </div>
            </>
          )}
        </div>
        <div className="d-flex justify-content-end align-items-center pt-3">
          {/* <div id="prev">
            {currentQuestionIndex > 0 && !quizCompleted && (
              <button
                className="btn btn-primary"
                onClick={handlePreviousQuestion}
              >
                Previous
              </button>
            )}
          </div> */}
          <div className="ml-auto mr-sm-5">
            {currentQuestionIndex < questionsQuiz.length - 1 &&
            !quizCompleted ? (
              <button className="btn btn-success" onClick={handleNextQuestion}>
                Next
              </button>
            ) : !quizCompleted ? (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Finish
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          <b style={{ color: "black" }}>
                            Are you sure you want to submit?
                          </b>
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body"></div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={handleSubmitQuiz}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
