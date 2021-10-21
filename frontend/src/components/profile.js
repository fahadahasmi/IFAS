import React from "react";
import "../css/profile.css";
import Breadcrumbs from "./Screens/Breadcrumbs";
import Navbar from "./Screens/Navbar";

export default function profile() {
  return (
    <div>
      <Navbar />

      <Breadcrumbs />
      <section id="lef-pro">
        <div class="Pro-Container">
          <div class="Pro-card">
            <img src="Image/user.png" class="Profile-img" alt="Profile" />
            <div class="overlay">
              <div class="Edit-icon">
                <img
                  src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/30/external-edit-interface-kiranshastry-solid-kiranshastry.png"
                  class="Edit-Icon"
                  alt="Edit"
                />
              </div>
            </div>
            <input
              type="text"
              name="Name"
              value="Shivam Gupta"
              class="naming"
            />
          </div>
          <div class="Pro-main">
            <p>
              <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/20/000000/external-history-instagram-flatart-icons-outline-flatarticons.png" alt="#" />
              Last Activity
            </p>
            <p>
              <img
                src="https://img.icons8.com/material-outlined/20/000000/database-backup.png"
                alt="Last Activity"
              />{" "}
              Attendance Records
            </p>
            <p>
              <img src="https://img.icons8.com/ios/24/000000/password1--v2.png" alt="#"/>
              <a href="Change Password" name="Password" class="pass">
                Change Password
              </a>
            </p>
            <p>
              <img
                src="https://img.icons8.com/ios/20/000000/medical-history.png"
                class="click"
                alt="Feedback"
              />{" "}
              Send feedback
            </p>
            <p>
              <img src="https://img.icons8.com/ios-filled/20/000000/logout-rounded.png" alt="#" />{" "}
              Logout
            </p>
          </div>
        </div>
        <div class="Right-box">
          <h1 class="abt">ABOUT</h1>
          <div class="short">
            <div class="Nam">
              <h1>Name </h1>
              <h3>Shivam Gupta</h3>
            </div>
            <div class="Nam">
              <h1>Phone</h1>
              <h3>8887777222</h3>
            </div>
            <div class="Nam">
              <h1>Email </h1>
              <h3>Shivam@gmail.com</h3>
            </div>
            <div class="Nam">
              <h1>Experience</h1>
              <h3>12 Years</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
