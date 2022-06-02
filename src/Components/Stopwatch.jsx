import style from "./Stopwatch.module.css";
import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(0);
  const [hrs, setHrs] = useState(0);

  const [isActive, setIsActive] = useState(false);

  function reset() {
    setSeconds(0);
    setMs(0);
    setMins(0);
    setHrs(0);
    setIsActive(false);
  }
  function start() {
    setIsActive(!isActive);
  }
  function pause() {
    setIsActive(false);
  }

  useEffect(() => {
    let interval = 0;

    if (isActive) {
      interval = setInterval(() => {
        setMs((ms) => ms + 1);
        if (ms === 99) {
          clearInterval(interval);
          setMs(0);
          setSeconds((seconds) => seconds + 1);
        }
        if (seconds === 60) {
          clearInterval(interval);
          setMs(0);
          setSeconds(0);
          setMins((mins) => mins + 1);
        }
        if (mins === 60) {
          clearInterval(interval);
          setMs(0);
          setSeconds(0);
          setMins(0);
          setHrs((hrs) => hrs + 1);
        }
      }, 10);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, ms, mins, hrs]);

  return (
    <div>
      <div>Stopwatch</div>
      <div className={style.inputDiv}>
        <h3>{hrs < 10 ? `${hrs}` : hrs} </h3>
        <p>h</p>
        <h3>{mins < 10 ? `${mins}` : mins} </h3>
        <p>m</p>
        <h3>{seconds < 10 ? `${seconds}` : seconds} </h3>
        <p>s</p>
        <h4 className={style.milisec}>{ms < 10 ? `${ms}` : ms}</h4>
        {/* <p>ms</p> */}
      </div>
      <div className={style.stopwatch}>
        <button className={style.start} onClick={start}>
          Start
        </button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
