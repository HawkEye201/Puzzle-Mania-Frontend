import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../api/api";
import { Spinner } from "react-bootstrap";

const LoginForm = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(baseURL + "/user/login", { email, password })
      .then((res) => {
        // console.log(res);
        const token = res.data.token;

        axios
          .get(baseURL + "/user/me", {
            headers: {
              token: token,
            },
          })
          .then((res) => {
            // console.log(res);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("id", res.data._id);
            localStorage.setItem("role", res.data.role);
          })
          .catch((e) => {
            alert(e);
          });
        setLoading(false);
        setTimeout(() => {
          if (res.data.role === 1) {
            navigate("/user");
          } else {
            navigate("/admin");
          }
        }, 1000);

        // props.setToken(res.data.data.token);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="login-container">
      <div className="loginform">
        <h2 id="headerTitle">Login</h2>
        <form onSubmit={submitHandler}>
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
          <div id="button" className="row">
            <button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Login"}
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
          Not having an account?
          <Link to="/signup" style={{ textDecoration: "none" }}>
            {" "}
            Signup{" "}
          </Link>{" "}
          now!!!
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
