import React, { useState, useEffect } from "react";
import "../css/profile.css";
import Breadcrumbs from "./Screens/Breadcrumbs";
import Navbar from "./Screens/Navbar";
import { Link, useHistory } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";


export default function Profile() {
  
  const [profile1, setProfile] = useState();
  const [isProf, setIsprof] = useState(false);
  const history = useHistory();
  const { signOut } = useGoogleLogout({
      clientId:
        "729665954198-81fudj2fk3fd5il8jdha5suvej5r412c.apps.googleusercontent.com",
      onLogoutSuccess,
      onFailure,
    });
    function onLogoutSuccess() {
      localStorage.clear();
      history.push("/signIn");
    }
    function onFailure() {
      console.log("Error");
    }
    
  useEffect(()=>{
    userInfo()
  },[])

  function userInfo() {
    fetch("http://localhost:4000/api/auth/user", {
      method: "POST",
      headers: {
        "auth-Token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setIsprof(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <Navbar />

      <Breadcrumbs />
      <section id="lef-pro">
        <div class="Pro-Container">
          <div class="Pro-card">
            <img src="https://img.icons8.com/color/48/000000/test-account.png" class="Profile-img" alt="Profile" />
            {
              isProf?              <>
              <h2>{profile1.name}</h2>
              </>:false
            }
          </div>
          <div class="Pro-main">
            <Link to="/Records">
              <img
                src="https://img.icons8.com/material-outlined/20/000000/database-backup.png"
                alt="Last Activity"
              />{" "}
              Attendance Records
            </Link>
            <Link to="/">
              <img
                src="https://img.icons8.com/ios/20/000000/medical-history.png"
                class="click"
                alt="Feedback"
              />{" "}
              Send feedback
            </Link>
            <Link>
              <img src="https://img.icons8.com/ios-filled/20/000000/logout-rounded.png" alt="#" />{" "}
              <Link to="#" onClick={signOut}>
                Logout
              </Link>
            </Link>
          </div>
        </div>
        <div class="Right-box">
          <h1 class="abt">About You</h1>
          <div class="short">
          {
              isProf?              <>
              <h3>Name: {profile1.name}</h3>
              <h3>Email: {profile1.email}</h3>
              </>:false
            }
          </div>
        </div>
      </section>
    </div>
  );
}
