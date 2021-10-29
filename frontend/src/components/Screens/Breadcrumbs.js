import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumbs = () => {
  const sidebar = useRef("0px");
  const breadcrumbs = useBreadcrumbs();
  const [profile, setProfile] = useState();
  const [isProf, setIsprof] = useState(false);

  function openSidebar() {
    sidebar.current.style.width = "340px";
    userInfo();
  }

  function closeSidebar() {
    sidebar.current.style.width = "0px";
  }

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
    <>
      <div>
        <div className="breadcum">
          <ul id="breadcumb">
            <li>{breadcrumbs.map(({ breadcrumb }) => breadcrumb)}</li>
          </ul>
          <span id="openNav" onClick={openSidebar}>
            <img
              src="https://img.icons8.com/ios/25/000000/menu--v3.png"
              alt="img"
            />
          </span>
        </div>
        <div id="sideNav" ref={sidebar}>
          <Link to="#" id="closeNav" onClick={closeSidebar}>
            <img
              src="https://img.icons8.com/ios/35/000000/delete-sign--v3.png"
              alt=""
            />
          </Link>
          <div className="Profile">

            <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="img"></img>
            {
              isProf?              <>
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              </>:false
            }
          </div>
          <hr></hr>

          <Link to="/aboutUs">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="#">Help</Link>
          <Link to="/aboutDevelop">About Developers</Link>
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
