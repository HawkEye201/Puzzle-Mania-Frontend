import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/api";
import { Spinner } from "react-bootstrap";

const RegisterForm = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords do not match!!!");
      return;
    }
    const user = {
      username: userName,
      email: email,
      password: password,
    };
    axios
      .post(baseURL + "/user/signup", { user })
      .then((res) => {
        // console.log(res.data);

        setLoading(false);
        alert("Signup success");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div className="signup-container">
      <div className="signupform">
        <h2 className="signup-headerTitle">Signup</h2>
        <form onSubmit={submitHandler}>
          <div className="row">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div id="button" className="row">
            <button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Signup"}
            </button>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBlock: "15px",
            whiteSpace: "pre-wrap",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>{" "}
          now!!!
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
