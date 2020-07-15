import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createError } from "../reducers/notificationReducer";
import { useHistory } from "react-router-dom";

import userService from "../services/userServices";

function Register({ user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const errors = [];
      if (password !== confirmPassword) {
        errors.push("Password Confirmation does not match!");
      }
      if (errors.length !== 0) {
        throw errors;
      }
      await userService.register({ username, password });
      const response = await userService.login({ username, password });
      const token = JSON.stringify(response);
      window.localStorage.setItem("loggedUser", token);
      window.location.reload();
    } catch (err) {
      if (Array.isArray(err)) {
        err.forEach((singleError) => dispatch(createError(singleError)));
      } else if (err && err.response) {
        dispatch(createError(err.response.data.error));
      }
    }
  };
  return (
    <div className="credentials-container">
      <form onSubmit={registerUser}>
        <small>Username</small>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <small>Password</small>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <small>Confirm Password</small>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />{" "}
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
