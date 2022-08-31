import { useState } from "react";

function App() {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [mainQuestionArray, setMainQuestionArray] = useState([]);
  const [occurence, setOcurrence] = useState(0);
  const [resultDiv, setResultDiv] = useState(false);
  const [chooseBTN, setChooseBTN] = useState(false);

  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [index, setIndex] = useState(1);
  const [answer, setAnswer] = useState("");

  const [questionInput, setQuestionInput] = useState(true);
  const [optionInput, setOptionInput] = useState(true);

  let mainQuestion = document.getElementById("mainQuestion");
  let allOptions = document.getElementById("allOptions");

  //function to append question
  function addQuestion() {
    if (question === "") {
      alert("Please input a question");
    } else {
      mainQuestion.innerText = `${question}`;
      setQuestion("");
      setQuestionInput(false);
      mainQuestionArray.push(question);
      console.log(mainQuestionArray);
    }
  }

  //function to check how many times question  has been asked
  function checkQuestionOccurence(array, value) {
    let count = 0;
    array.forEach((v) => v === value && count++);
    return setOcurrence(count);
  }

  //function to append options
  function addOptions() {
    if (option === "") {
      alert("Please input an option");
    } else {
      setChooseBTN(true);
      setIndex(index + 1);
      let html = document.createElement("p");
      html.classList.add("text-2xl", "md:text-3xl");
      html.innerText = `${index}. ${option}`;
      allOptions.appendChild(html);

      setOption("");
      questionsArray.push(option);
    }
  }

  //function to generate a random element from an array
  function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  //function to pick random number from questionsArray
  function pickRandomOption() {
    if (mainQuestion.innerText === "") {
      alert("Please input a question");
    } else {
      setChooseBTN(true);
      setResultDiv(true);
      setAnswer(`${random_item(questionsArray)}`);
      checkQuestionOccurence(mainQuestionArray, mainQuestion.innerText);
      setChooseBTN(false);
      setOptionInput(false);
    }
  }

  function reset() {
    allOptions.innerHTML = "";
    mainQuestion.innerText = "";
    setIndex(1);
    setQuestionInput(true);
    setResultDiv(false);
    setQuestionsArray([]);
    setOptionInput(true);
    console.log(questionsArray);
  }
  return (
    <div className="App bg-gray-900 text-white">
      <div className="bg-gray-700 mx-4 p-2 mt-4 sticky rounded md:bg-gray-900">
        
        {questionInput && (
          <div className="flex flex-row justify-center mt-4">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter Question"
              type="text"
              className="appearance-none block w-60 bg-gray-100 rounded-sm py-1 leading-tight border text-black focus:outline-none focus:bg-blue-100 focus:border-gray-900 md:w-6/12 md:h-10"
            />
            <button
              onClick={addQuestion}
              className="bg-blue-200 text-black px-2 rounded ml-2 font-bold"
            >
              +
            </button>
          </div>
        )}

        {optionInput && (
          <div className="mt-4 flex flex-row justify-center">
            <input
              value={option}
              onChange={(e) => setOption(e.target.value)}
              placeholder="Enter Option"
              type="text"
              className="appearance-none block w-60 bg-gray-100 rounded-sm py-1 leading-tight border text-black focus:outline-none focus:bg-blue-100 focus:border-gray-900 md:w-6/12 md:h-10"
            />

            <button
              onClick={addOptions}
              className="bg-blue-200 text-black px-2 rounded ml-2 font-bold"
            >
              +
            </button>
          </div>
        )}

        <div className="flex flex-col justify-center items-center">
          <h1 id="mainQuestion" className="font-bold text-3xl md:text-5xl"></h1>

          <div id="allOptions" className="text-bold text-xl mt-4"></div>
        </div>

        <div className="flex flex-row justify-center items-center mt-2">
          {chooseBTN && (
            <button
              onClick={pickRandomOption}
              className="bg-blue-500 p-2 rounded"
            >
              PICK AN OPTION
            </button>
          )}
        </div>

      </div>

      {resultDiv && (
        <div className="flex flex-col justify-center items-center">
          <h1 id="answer" className="text-lg md:text-2xl text-center">
            This question has been asked {occurence} time(s)
          </h1>
          <h1 id="answer" className="text-lg md:text-2xl">
            Answer: {answer}
          </h1>

          <div className="flex flex-row mt-1">
            <button
              onClick={pickRandomOption}
              className="bg-blue-500 p-2 rounded mr-2"
            >
              <a href="#result">PICK AGAIN</a>
            </button>
            <button onClick={reset} className="bg-blue-500 p-2  rounded">
              RESTART
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
