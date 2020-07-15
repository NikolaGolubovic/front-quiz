import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <header className="nav">
      <NavLink exact to="/" activeClassName="nav-active">
        Homepage
      </NavLink>
      <NavLink to="/quiz" activeClassName="nav-active">
        Play Quiz
      </NavLink>
      {user ? (
        <div className="user-control">
          <div className="log-out" onClick={logOut}>
            Log Out
          </div>
        </div>
      ) : (
        <>
          <NavLink to="/register" activeClassName="nav-active">
            Sign Up
          </NavLink>
          <NavLink to="/login" activeClassName="nav-active">
            Sign In
          </NavLink>
        </>
      )}
    </header>
  );
}
