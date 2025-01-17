import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";

const Navbar = () => {
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

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src='/Image/logo.jpg' alt='Logo' />
        </div>
        <div className="nav-content">
          <ul id="sitemaps">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/attendance">Attendance</Link>
            </li>
            <li>
              <Link to="/upload">Dataset</Link>
            </li>
            <li>
              <Link to="#" onClick={signOut}>
                Logout
              </Link>
            </li>
            <Link id="profile_logo" to="/profile">
              <img
                src="https://img.icons8.com/color/48/000000/test-account.png"
                alt="img"
              />
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
