import { useEffect, useState, React } from "react";

const Stopwatch = ({ IsRunning, handleStop }) => {
  const [time, setTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  let intervalId, seconds, minutes, hours;

  useEffect(() => {
    if (IsRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);

      seconds = Math.floor((time % 6000) / 100);
      minutes = Math.floor((time % 360000) / 6000);
      hours = Math.floor(time / 360000);

      if (seconds < 10) seconds = `0${seconds}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (hours < 10) hours = `0${hours}`;

      setFormattedTime(`${hours}:${minutes}:${seconds}`);
      handleStop(formattedTime);
    }
    return () => clearInterval(intervalId);
  }, [IsRunning, time]);

  return <div>{formattedTime}</div>;
};

export default Stopwatch;
