import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state);
  return (
    <div>
      {notifications.info &&
        notifications.info.map((info) => {
          setTimeout(
            () => dispatch({ type: "REMOVE_NOTI", id: info.id }),
            4000
          );
          return (
            <div className="info-notification" key={info.id}>
              <p>{info.content}</p>
              <button
                onClick={() => dispatch({ type: "REMOVE_NOTI", id: info.id })}
              >
                Close
              </button>
            </div>
          );
        })}
      {notifications.errors &&
        notifications.errors.map((error) => {
          setTimeout(
            () => dispatch({ type: "REMOVE_ERROR", id: error.id }),
            4000
          );
          return (
            <div className="error-notification" key={error.id}>
              <p>{error.content}</p>
              <button
                onClick={() => dispatch({ type: "REMOVE_ERROR", id: error.id })}
              >
                Close
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Notification;
