import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../css/reg.css";
import GoogleAuth from "./GoogleAuth";
import WAVES from 'vanta/dist/vanta.waves.min'
import NET from 'vanta/dist/vanta.net.min'

const SignUp = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const [vanta1Effect, setVanta1Effect] = useState(0)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
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
    <section ref={vanta1Ref} style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
        <div className="mainSection">
          <div className="leftSection">
            <div className="imgCont" ref={vantaRef}>
              {/* <img src="/Image/poly.svg" alt="" /> */}
            </div>
            <div className='googleButCont'>
              <h2>Get Started</h2>
              <GoogleAuth />
            </div>
          </div>
          <div className="rightSection">
            <div id="Logo">
              <img src="/Image/logo.jpg" alt="logo" />
            </div>
            <div className="formCont">
              <h3>Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="formFields">
                  <label htmlFor='name'>Name</label>
                  <input type="text" id="name" placeholder="Name" onChange={(e) => {
                    setName(e.target.value);
                  }}
                    value={name}
                    required />
                </div>
                <div className="formFields">
                  <label htmlFor='email'>Email</label>
                  <input type="email" id="email" placeholder="Email" onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                    value={email} required />
                </div>
                <div className="formFields">
                  <label htmlFor='institute_name'>Institute Name</label>
                  <input type="institute_name" id="institute_name" placeholder="Institute Name" onChange={(e) => {
                    setInstitute(e.target.value);
                  }}
                    value={institute}
                    required />
                </div>
                <div className="formFields">
                  <label htmlFor='password'>Password</label>
                  <input type="password" id="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                    value={password}
                    required />
                </div>
                <div className="formFields">
                  <button>Sign Up</button>
                </div>
              </form>
              <div>
                <p>Already registered?</p>
                <Link to='/signIn'>Login</Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

