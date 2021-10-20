import "../css/login.css";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("token", data.authToken);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container1">
        <form onSubmit={handleLogin}>
          <div className="heading">
            <h2>Face Recognition System</h2>
            <div className="logo1">
              <img src="/Image/fr logo.jpg" alt="logo" />
            </div>
          </div>
          <div className="info">
            Email:{" "}
            <input
              type="text"
              name="username"
              className="inputfield"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            Password:{" "}
            <input
              type="password"
              name="pswd"
              className="inputfield"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="btn">Login</button>
            <div id="login" className="l-line">
              <GoogleAuth />
              <h3>
                Don't have an account? <Link to="/signUp">Sign Up</Link>
              </h3>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
