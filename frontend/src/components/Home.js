import { Link, useHistory } from "react-router-dom";
import "../css/style.css";
import Chart from "./Chart";
import React, { useState, useEffect } from 'react';
import Breadcrumbs from "./Screens/Breadcrumbs";
import Navbar from "./Screens/Navbar";
import ContactUs from "./Screens/ContactUs";

const Home = () => {
  const history = useHistory()
  const [name, setName] = useState('');
  const [isName, setIsName] = useState(false);
  useEffect(() => {
    userInfo();
    setTimeout(() => {
      console.log('After 10s logout');
      localStorage.clear();
      history.push('/signIn')
    }, 3600 * 1000);
    // eslint-disable-next-line 
  }, []);

  userInfo();

  function userInfo() {
    fetch("http://localhost:4000/api/auth/user", {
      method: "POST",
      headers: {
        'auth-token': localStorage.getItem('token'),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setIsName(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div>

        <Navbar />

        <Breadcrumbs />

        <section className="buttonsSection">
          <div className="container">
            <Link to="/attendance">
              <div>
                <h5>Get attendance</h5>
              </div>
            </Link>
            <Link to="/upload">
              <div>
                <h5>Upload dataset</h5>
              </div>
            </Link>
            <Link to="/Records">
              <div>
                <h5>Attendance Records</h5>
              </div>
            </Link>
          </div>
        </section>
        <section id="chartSection">
          <div className="chart">
              {isName?(<Chart name={name} />):null}
          </div>
        </section>
        <section id="ContactUs">
          <div className="contact">
              <ContactUs />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
