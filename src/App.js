import "./App.css";

import { useState, useEffect } from "react";

import { BsFillPlayFill, BsStopFill } from "react-icons/bs";
import Stopwatch from "./components/Stopwatch";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTaskName, setCurrentTaskName] = useState("");
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    let loadedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (loadedTasks === null) return;

    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length == 0) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleStartButtonClick = () => {
    if (isRunning) return;

    if (!inputValue.trim()) {
      alert("Podaj nazwę zadania.");
      return;
    }

    setCurrentTaskName(inputValue);
    setIsRunning(true);
  };

  const handleStopButtonClick = () => {
    if (!isRunning) return;
    setTasks([...tasks, { Name: inputValue, Time: timeElapsed }]);
    setIsRunning(!isRunning);
    setInputValue("");
  };

  return (
    <div className="App min-h-screen bg-gray-200">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-3/4 h-32 md:h-24 shadow-lg bg-white rounded mt-20 py-4 px-10 flex justify-between items-center flex-col md:flex-row">
          <div className="w-full text-xl h-full flex items-center ">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="w-full h-full md:h-3/4 px-2 focus:outline-gray-400 active:outline-gray-400 border-gray-200 border-2 rounded text-gray-800"
              placeholder="Wpisz nazwę zadania"
              readOnly={isRunning ? "readonly" : false}
            ></input>
          </div>

          <div className="text-xl h-full flex items-center">
            {!isRunning ? (
              <button
                onClick={handleStartButtonClick}
                className="bg-green-500 w-24 text-2xl flex justify-center text-white rounded mx-2 mt-2 md:mt-0 border-2 py-2 border-green-500 hover:bg-green-400 hover:border-green-400"
                disabled={isRunning ? "disabled" : false}
              >
                <BsFillPlayFill />
              </button>
            ) : (
              <button
                onClick={handleStopButtonClick}
                className="bg-red-500 w-24 text-2xl flex justify-center text-white rounded border-2 mt-2 md:mt-0 mx-2 py-2 border-red-500 hover:bg-red-400 hover:border-red-400"
                disabled={!isRunning ? "disabled" : false}
              >
                <BsStopFill />
              </button>
            )}
          </div>
        </div>

        {isRunning && (
          <div className="border-gray-500 bg-white shadow flex justify-center text-lg border-2 mt-10 w-fit p-2">
            <span className="font-bold">{currentTaskName}</span>:&nbsp;
            <Stopwatch handleStop={setTimeElapsed} IsRunning={isRunning} />
          </div>
        )}

        <div className="my-20 8/12 md:w-5/12 flex justify-center">
          <div className="w-full">
            {tasks.map((el, i) => {
              return (
                <div
                  key={i}
                  className="w-full p-4 mt-2 shadow-lg bg-white rounded flex items-center text-xl"
                >
                  <div className="w-1/2 font-bold task-name pl-1">
                    {el.Name}
                  </div>
                  | czas trwania: {el.Time}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
