import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Notification from "./components/Notification";
import Homepage from "./components/Homepage";
import SelectQuiz from "./components/SelectQuiz";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";

import userService from "./services/userServices";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const objWithToken = JSON.parse(loggedUser);
      const token = objWithToken.token;
      setUser(objWithToken.username);
      userService.setToken(token);
    }
  }, [user]);
  return (
    <Router>
      <Header user={user} />
      <Notification />
      <div className="container">
        <Switch>
          <Route exact path="/quiz">
            <SelectQuiz user={user} />
          </Route>
          <Route exact path="/login">
            <Login user={user} />
          </Route>
          <Route exact path="/register">
            <Register user={user} />
          </Route>
          <Route exact path="/">
            <Homepage user={user} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
