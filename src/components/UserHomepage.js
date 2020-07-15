import React, { useState, useEffect } from "react";
import userService from "../services/userServices";

function UserHomepage({ user }) {
  const [scores, setScores] = useState({});
  useEffect(() => {
    userService
      .getScoreCard()
      .then((data) => setScores(data))
      .catch((err) => console.log("err", err.response.data));
  }, []);
  return (
    <div className="user-score">
      <h1>Hello {user}</h1>
      <p>
        Your last game score is {scores.totalPoints <= 0 ? 0 : scores.lastScore}
      </p>
      <p>Your best score is {scores.maxPoints}</p>
      <p>
        Your average score per game is{" "}
        {scores.totalPoints === 0
          ? 0
          : (scores.totalPoints / scores.totalGames).toFixed(0)}
      </p>
    </div>
  );
}

export default UserHomepage;
