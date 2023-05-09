import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";
import ProblemList from "./ProblemsList";
import ReactModal from "react-modal";
import baseURL from "./api/api";
import axios from "axios";

const word = ["P", "E", "R", "S", "E", "V", "E", "R", "E"];

function UserHome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [step, setStep] = useState(0);
  const [val, setVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [startPuzzle, setStartPuzzle] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [wa, setWa] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [toContinue, setToContinue] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const ID = localStorage.getItem("id");
    if (username) {
      setUserName(username);
    }
    if (ID) setId(ID);
    else {
      navigate("/");
      return;
    }
    try {
      console.log(ID);
      axios
        .get(baseURL + "/user/details/" + ID)
        .then((res) => {
          console.log(res.data);
          setStep(res.data.currentStep);
          setWa(res.data.wa);
          if (res.data.startTime !== 0) {
            setStartTime(res.data.startTime);
          }
          if (res.data.currentStep !== 0) {
            setToContinue(true);
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    navigate("/");
  };

  const startPuzzleHandler = () => {
    saveData(0, 0);
    setStartPuzzle(true);
  };

  const saveData = (currentStep, wrong) => {
    const now = Date.now();
    const timeTaken = (now - startTime) / 1000;
    const wrongAttempts = wa;
    const stepDetail = { step, timeTaken, wrongAttempts };
    try {
      axios
        .put(baseURL + "/user/details/update", {
          id,
          currentStep,
          wrong,
          now,
          stepDetail,
        })
        .then((res) => console.log(res.status))
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  const checkAnswer = (e) => {
    if (e.key === "Enter") {
      setShowModal(true);
    }
  };

  const changeProblem = () => {
    if (step === 8) {
      setIsComplete(true);
    } else setStep(step + 1);
    setWa(0);
    setShowModal(false);
    setVal("");
    saveData(step + 1, 0);
  };

  const TOContinueModal = () => {
    return (
      <ReactModal
        isOpen={toContinue}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            width: "50vw",
            height: "30vw",
            maxWidth: "300px",
            maxHeight: "200px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
          },
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div>Do you want to continue from last solved step?</div>
            <div>
              <button
                className="modal-button"
                onClick={() => {
                  setStartPuzzle(true);
                  setToContinue(false);
                }}
              >
                Continue
              </button>
              <button
                className="modal-button"
                onClick={() => {
                  setStep(0);
                  setWa(0);
                  setStartTime(Date.now());
                  saveData(0, 0);
                  setToContinue(false);
                }}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  };

  return startPuzzle === false ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TOContinueModal />

      <button
        onClick={() => logout()}
        style={{ position: "fixed", right: 0, top: 75 }}
      >
        Logout
      </button>
      <h3>Hi {userName}! Hope you are doing well!</h3>
      <h4>Let's check your soft skills</h4>
      <button className="modal-button" onClick={() => startPuzzleHandler()}>
        Start the puzzle
      </button>
    </div>
  ) : (
    <div>
      <ReactModal
        isOpen={showModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            width: "50vw",
            height: "30vw",
            maxWidth: "300px",
            maxHeight: "200px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
          },
        }}
      >
        <div>
          {val.toLowerCase() === word[step].toLowerCase() ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ alignSelf: "center" }}>
                Yayy!!! You got the correct answer.
              </div>
              <button className="modal-button" onClick={() => changeProblem()}>
                Go to next problem
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>Oh no!!! You got it wrong.</div>
              <button
                className="modal-button"
                onClick={() => {
                  setShowModal(false);
                  setWa(wa + 1);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </ReactModal>
      <ReactModal
        isOpen={isComplete}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            width: "50vw",
            height: "30vw",
            maxWidth: "300px",
            maxHeight: "200px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
          },
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div>Hurray!!! You have solved all the problems.</div>
            <button
              className="modal-button"
              onClick={() => {
                setIsComplete(false);
                setStartPuzzle(false);
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </ReactModal>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          Guess the Word!!!
        </div>
        <div
          style={{
            width: "100%",
            height: "8vh",
            backgroundColor: "#D7BE68",
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "1vw" }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              return (
                <div key={i} className="word-bottom">
                  {step <= i ? (
                    <input
                      placeholder=""
                      disabled={step < i}
                      maxLength={1}
                      value={step === i ? val : ""}
                      onChange={(e) => setVal(e.target.value)}
                      onKeyDown={checkAnswer}
                      style={{
                        background: "transparent",
                        border: "none",
                        width: "8px",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontWeight: "Bold",
                        color: "#5E4300",
                        fontSize: "20px",
                      }}
                    >
                      {word[i]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            padding: "2vw",
            backgroundColor: "rgba(95, 207, 207, 0.24)",
          }}
        >
          {ProblemList[step]}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
