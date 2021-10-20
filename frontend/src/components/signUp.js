import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../css/reg.css";
import GoogleAuth from "./GoogleAuth";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        institute_name: institute,
        username,
        password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.error) {
      alert(json.error);
    } else {
      localStorage.setItem("token", json.authToken);
      history.push("/signIn");
    }
  };

  return (
    <div className="gradient-background">
      <div className="container2">
        <h2>FACE RECOGNITION SYSTEM</h2>
        <section>
          <div className="logo1">
            <img src="/Image/fr logo.jpg" alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" />
            <input
              type="email"
              placeholder="Email ID"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <label htmlFor="name" />
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
            <label htmlFor="institute" />
            <input
              type="text"
              placeholder="Institute Name"
              name="institute"
              id="institute"
              onChange={(e) => {
                setInstitute(e.target.value);
              }}
              value={institute}
              required
            />
            <label htmlFor="username" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              required
            />
            <label htmlFor="pswd" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="pswd"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
            <button className="btn" type="submit">
              Sign Up
            </button>
          </form>
          <div id="login">
              <GoogleAuth />
              <p>
                Already have an account? <Link to="/signIn">Login</Link>
              </p>
            </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
