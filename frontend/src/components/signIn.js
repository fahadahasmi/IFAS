import React, { useState, useRef, useEffect } from "react";
import "../css/login.css";
import { useHistory, Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import WAVES from 'vanta/dist/vanta.waves.min'
import NET from 'vanta/dist/vanta.net.min'

const SignIn = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const [vanta1Effect, setVanta1Effect] = useState(0)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const vantaRef = useRef(null);
  const vanta1Ref = useRef(null);
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
    if (!vanta1Effect) {
      setVanta1Effect(NET({
        el: vanta1Ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: '#0df2f2',
        backgroundColor: '#001818',
        showDots: false
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
    <section ref={vanta1Ref} style={{ width: '100vw', height: '100vh', background: '#005555' }}>
      <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
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
              <h3>Login</h3>
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
                </div>
              </form>
              <div>
                <p>Don't have an account?</p>
                <Link to='/signUp'>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default SignIn;
