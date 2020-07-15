import React from "react";
import { createInfo, createError } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userService from "../services/userServices";

function Score({ score, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const confirmResult = async () => {
    console.log(score);
    await userService.sendScore(score);
    dispatch(createInfo("Your score is successfully updated"));
    history.push("/");
  };
  return (
    <div className="score-container">
      <h2>You made: {score} </h2>
      {user && (
        <button className="confirm-score" onClick={confirmResult}>
          Confirm Your result
        </button>
      )}
      {!user && (
        <button
          className="confirm-score"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default Score;
