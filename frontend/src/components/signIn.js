import React, { useState, useRef, useEffect } from "react";
import "../css/login.css";
import { useHistory, Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import WAVES from 'vanta/dist/vanta.waves.min'

const SignIn = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const vantaRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: '#005555',
        shininess: 21.00,
        waveHeight: 6.50,
        waveSpeed: 2.00,
        zoom: 0.90

      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
    <div className="container1">
      <div className="lefty">
        <div className="logo1" ref={vantaRef}>
          {/* <img src="\Image\IFAS.jpeg" alt="logo"/>  */}
        </div>

        <div className='googleBtn'>
          <h2>Get Started</h2>
          <GoogleAuth />
        </div>
      </div>
      <div className="righty">
        <div id="Logo">
          <img src="\Image\logo.jpg" alt="logo" />
        </div>
        <div className="info">
          <h3>LOGIN</h3>
          <form onSubmit={handleLogin}>
            <div className="loginForm">
              <label htmlFor='email'>Email</label>
              <input type="text" id="email" placeholder="Email" onChange={(e) => {
                setEmail(e.target.value);
              }}
                value={email} required />
            </div>
            <div className="loginForm">
              <label htmlFor='password'>Password</label>
              <input type="password" id="password" placeholder="*******" onChange={(e) => {
                setPassword(e.target.value);
              }}
                value={password}
                required />
            </div>
            <div className="loginForm">
              <button>Login</button>
              {/* <p>Already have an account? <a href="">Sign Up</a></p> */}

            </div>
          </form>
          <p>Already have an account? <Link to='/signUp'>Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};


export default SignIn;
