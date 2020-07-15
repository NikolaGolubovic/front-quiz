import React, { useState } from "react";
import Quiz from "./Quiz";
import { useHistory } from "react-router-dom";

function SelectQuiz({ user }) {
  const history = useHistory();
  let helperObj = {}; // to work with objActive
  let helperArr = []; // for pushin category Nums
  const categoriesArr = [
    { "General Knowledge": 9 },
    { History: 23 },
    { Geography: 22 },
    { Film: 11 },
    { "Science & Nature": 17 },
  ];
  let objWithMovieCodes = {};
  categoriesArr.forEach((objItem) => {
    for (let key in objItem) {
      objWithMovieCodes[key] = objItem[key];
    }
  });
  categoriesArr.forEach((arrItem, index) => {
    for (let key in arrItem) {
      helperObj[key] = false;
    }
  });
  const [categoryNums, updateCategoryNums] = useState([]);
  const [objActive, updateActive] = useState(helperObj);
  const [quizCreated, updateQuizCreated] = useState(false);

  function activeClass(key) {
    helperObj = objActive;
    if (helperObj[key]) {
      helperObj[key] = false;
      updateActive(helperObj);
    } else {
      helperObj[key] = true;
      updateActive(helperObj);
    }
    helperArr = categoryNums;
    for (var i = 0; i < helperArr.length; i++) {
      if (helperArr[i] === objWithMovieCodes[key]) {
        helperArr.splice(i, 1);
        updateCategoryNums(helperArr);
        history.push("/quiz");
        return;
      }
    }
    helperArr.push(objWithMovieCodes[key]);
    updateCategoryNums(helperArr);
    history.push("/quiz");
  }
  function buttonText(obj) {
    // obj param is objActive
    let numOfSelected = 0;
    let temp = "";
    for (let key in obj) {
      if (obj[key]) {
        numOfSelected += 1;
      }
      if (numOfSelected === 1 && obj[key]) {
        // mora obj[key] inace ce da saltuje sve objekte otkad detektuje numOfSelected
        temp = key;
      }
    }
    return numOfSelected === 1
      ? `Create ${temp}'s Quiz`
      : numOfSelected > 1
      ? "Create Quiz with choosen areas"
      : "Create highly random Quiz";
  }

  function createQuiz() {
    updateQuizCreated(true);
  }

  return (
    <React.Fragment>
      <div className={!quizCreated ? "selection" : "blank"}>
        <h3>Choose your Categories</h3>
        <ul className="categories">
          {categoriesArr.map((category) => {
            for (let key in category) {
              return (
                <li
                  key={category[key]}
                  className={
                    objActive && objActive[key] ? "category active" : "category"
                  }
                  onClick={() => activeClass(key)}
                >
                  {key}
                </li>
              );
            }
          })}
        </ul>
        <button className="btn-create-quiz" onClick={createQuiz}>
          {buttonText(objActive)}
        </button>
      </div>

      <div className={quizCreated ? "quiz" : "blank"}>
        <Quiz nums={categoryNums} quizCreated={quizCreated} user={user} />
      </div>
    </React.Fragment>
  );
}

export default SelectQuiz;
