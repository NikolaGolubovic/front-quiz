import React, { useState, useEffect } from "react";
// import ReactHtmlParser from "react-html-parser";
import Spinner from "./Spinner";
import Score from "./Score";

function Quiz({ nums, quizCreated, user }) {
  const [questionsArr, updateQuestionsArr] = useState([]);
  const [loading, updateLoading] = useState(true);
  const [position, updatePosition] = useState(0); // index for questionsArr
  const [score, updateScore] = useState(0);
  const [timer, updateTimer] = useState(12);
  const [quizEnd, updateQuizEnd] = useState(false);
  const [half, updateHalf] = useState(false);
  const [triple, updateTriple] = useState(0);
  useEffect(() => {
    let addresses = [];
    let addressArr = [];
    // napraviti adrese od arraya iz propsa
    function makeAddresses(arr) {
      addresses = arr.map(
        (category) =>
          `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
      );
    }
    makeAddresses(nums);
    // napraviti promise iz addresses arraya
    async function fetchAddresses(arr) {
      if (arr.length < 1) {
        let res = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        let addr = await res.json();
        addressArr.push(addr.results);
      } else if (arr.length === 1) {
        let res = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${nums[0]}&type=multiple`
        );
        let addr = await res.json();
        addressArr.push(addr.results);
      } else if (arr.length > 1) {
        for (let i = 0; i < arr.length; i++) {
          let res = await fetch(arr[i]);
          let addr = await res.json();
          addressArr.push(addr.results);
        }
      }
    }

    // choose ten questions
    let finalQuestions = [];
    async function makeFinalArr() {
      await fetchAddresses(addresses);
      if (addressArr.length === 10) {
        updateQuestionsArr(addressArr);
        return;
      }
      let randomArr = [];
      function randomNums(num) {
        while (randomArr.length < 10) {
          randomArr.push(Math.floor(Math.random() * num));
          randomArr = [...new Set(randomArr)];
        }
      }
      addressArr = addressArr.reduce((acc, cur) => acc.concat(cur));
      randomNums(addressArr.length);
      for (let i = 0; i < randomArr.length; i++) {
        finalQuestions.push(addressArr[randomArr[i]]);
      }
      let solutions = []; // ici ce opcije sa prvom elementom kao tacnim odgovorom
      finalQuestions.forEach((question, index) => {
        solutions[index] = [];
        if (question.correct_answer) {
          solutions[index].push({
            solution: question["correct_answer"],
            answer: true,
          });
          delete question.correct_answer;
        }
        if (question.incorrect_answers) {
          question.incorrect_answers.map((incQuestion, incIndex) => {
            return solutions[index].push({
              solution: incQuestion,
              answer: false,
            });
          });
          delete question.incorrect_answers;
        }
      });
      function randomItems(arr) {
        // parametar arr sa tacnim odgovor elementom na uvek istom mestu
        let randomSolutions = [];
        for (var i = 0; i < arr.length; i++) {
          let random = [];
          while (random.length < 4) {
            random.push(Math.floor(Math.random() * 4));
            random = [...new Set(random)];
          }

          randomSolutions[i] = [];
          for (var j = 0; j < 4; j++) {
            randomSolutions[i][random[j]] = arr[i][j];
          }
        }
        return randomSolutions; // arr sa random elementima
      }
      solutions = randomItems(solutions);

      finalQuestions.forEach(
        (_, index) => (finalQuestions[index]["solutions"] = solutions[index])
      );
      await updateQuestionsArr(finalQuestions);
      updateLoading(false);
    }
    if (quizCreated) {
      makeFinalArr();
    }
  }, [quizCreated, nums]);
  // use real dependec, FIX FOR ERROR
  // However, we only truly needed count to transform it into count + 1 and “send it back” to React.
  // But React already knows the current count. All we needed to tell React is to increment the state — whatever it is right now.
  // https://overreacted.io/a-complete-guide-to-useeffect/?fbclid=IwAR2J2V2v0IurIHL25lxmX0Prg7OicvGWe74mhlcL4P0fBs1cLha6ETY_cJ0
  let mout; // set timeout variable
  const time = () => {
    if (timer === 0) {
      updateTimer(12);
      if (position === 9) {
        updateQuizEnd(true);
        return;
      }
      updatePosition(position + 1);
      updateHalf(false);
      return;
    } else {
      mout = setTimeout(() => {
        updateTimer(timer - 1);
      }, 1000);
    }
  };

  function nextQuestion(obj, level) {
    let points = 1;
    let timeBonus = 1;
    if (obj["answer"]) {
      if (level === "hard") {
        points = 5;
      } else if (level === "medium") {
        points = 3;
      }
      if (timer > 8) {
        timeBonus = 5;
      } else if (timer >= 4 && timer <= 8) {
        timeBonus = 3;
      }
      updateScore(score + points + timeBonus);
    } else {
      points = score + -3 >= 0 ? score - 3 : 0;
      updateScore(points);
    }
    clearTimeout(mout);
    if (position + 1 === 10) {
      updateQuizEnd(true);
      return;
    }
    updatePosition(position + 1);
    updateHalf(false);
    updateTimer(12);
  }

  function halfChance(arr) {
    let rArr = [];
    let wrongSolution = [];
    let iWrong = 0;
    while (rArr.length < 2) {
      rArr.push(Math.floor(Math.random() * 3));
      rArr = [...new Set(rArr)];
    }
    arr.forEach((item) => {
      if (!item.answer) {
        item.half = true;
        wrongSolution.push(item);
      }
    });
    for (var i = 0; i <= 2; i++) {
      if (i !== rArr[0] && i !== rArr[1]) {
        iWrong = i;
        break;
      }
    }
    wrongSolution[iWrong].half = false;
    clearTimeout(mout);
    updateHalf(true);
    updateTriple(triple + 1);
  }

  function justNext() {
    if (position + 1 === 10) {
      updateQuizEnd(true);
      return;
    }
    clearTimeout(mout);
    updatePosition(position + 1);
    updateHalf(false);
    updateTimer(12);
  }

  if (loading) return <Spinner />;
  return (
    <div className="quiz-main-container">
      <div className={!quizEnd ? "" : "blank"}>
        {questionsArr.map((question, index) => {
          if (position === index) {
            return (
              <ul className="quiz-container" key={question.question.slice(10)}>
                <li className="score-info" key={index} onClick={time()}>
                  <small>Time:</small> {timer} <small>Points:</small> {score}{" "}
                  <small>Question Number:</small> {index + 1}
                </li>
                <button
                  className={!half ? "fifty-fifty" : "fifty-used"}
                  onClick={() => halfChance(question.solutions)}
                  disabled={half || triple >= 3}
                >
                  50:50
                </button>
                <li className="question-title" key={question.category + index}>
                  {decodeURIComponent(question.question)}
                </li>
                {question.solutions.map((el) => {
                  return (
                    <button
                      className="solution"
                      key={el.solution}
                      onClick={() => nextQuestion(el, question["difficulty"])}
                      disabled={el.half}
                    >
                      <span className={el.half ? "half" : ""}>
                        {decodeURIComponent(el.solution)}
                      </span>
                    </button>
                  );
                })}
                <button className="next-q" onClick={justNext}>
                  Next Question
                </button>
              </ul>
            );
          }
        })}
      </div>
      <div className={quizEnd ? "score" : "blank"}>
        <Score score={score} user={user} />
      </div>
    </div>
  );
}

export default Quiz;
