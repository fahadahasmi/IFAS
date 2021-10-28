import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/signUp.js";
import SignIn from "./components/signIn.js";
import Home from "./components/Home.js";
import UploadDataset from "./components/UploadDataset.js";
import UploadStudent from "./components/UploadStudentsDs.js";
// import Attendance from "./components/Attendance.js";
// import AttendRecords from "./components/AttendRecords.js";
import Protected from "./components/protected.js";
import { Usercontext } from "./components/Context/userContext";
import Profile from "./components/profile.js";



function App() {

  return (
      <Router>
      <Switch>
        <Route exact path="/">
          <Protected component={Home} />
        </Route>
        <Route exact path="/upload">
          <Protected component={UploadDataset} />
        </Route>
        <Route exact path="/upload students/:datasetName">
          <Protected component={UploadStudent} />
        </Route>
        <Route exact path="/attendance">
          <Protected component={Usercontext} />
        </Route>

        <Route exact path="/Records">
          <Protected component={Usercontext} />
        </Route>
        <Route exact path="/profile">
          <Protected component={Profile} />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
        <Route exact path="/signIn">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
