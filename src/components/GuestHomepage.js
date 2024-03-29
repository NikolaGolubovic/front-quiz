import React from "react";

function GuestHomepage() {
  return (
    <div className="guest-homepage-container">
      <h2>Hello Guest</h2>
      <p>Wellcome to Trivia Quiz</p>
      <div className="quiz-imgs">
        <img src="/css/geo1.png" alt="" />
        <img src="/css/geo2.png" alt="" />
        <img src="/css/history1.jpg" alt="" />
        <img src="/css/history2.jpg" alt="" />
        <img src="/css/movie1.png" alt="" />
        <img src="/css/movie2.jpg" alt="" />
        <img src="/css/science1.png" alt="" />
        <img src="/css/science2.jpg" alt="" />
        <img src="/css/sport1.png" alt="" />
        <img src="/css/sport2.png" alt="" />
      </div>
      <div className="guest-directions">
        <p>
          <strike>
            If you want better experience, to compare yourself with others, you
            need to <a href="/register">Sign up</a>
          </strike>
        </p>
        <p>Sorry, there are problems with server right now</p>
        <p>But you can play quiz</p>
        <a className="guest-play-quiz" href="/quiz">
          Play Quiz
        </a>
      </div>
    </div>
  );
}

export default GuestHomepage;
