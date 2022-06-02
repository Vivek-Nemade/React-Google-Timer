import { useEffect, useState } from "react";
import style from "./Timer.module.css";

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [timeOn, setTimeOn] = useState(false);

  useEffect(() => {
    var hrId = null;
    var minId = null;
    var secId = null;

    if (timeOn) {
      secId = setInterval(() => {
        if (sec <= 0) {
          setSec(0);
        } else {
          setSec((prev) => prev - 1);
        }
        if (sec < 0) {
          clearInterval(secId);
        }
      }, 1000);

      if (sec === 0 && min !== 0) {
        clearInterval(secId);
        minId = setInterval(() => {
          setMin((prev) => prev - 1);
          if (min === 0) {
            clearInterval(minId);
          } else {
            setSec(60);
          }
        }, 1000);
      }
      if (min === 0 && hour !== 0) {
        hrId = setInterval(() => {
          setHour((prev) => prev - 1);
          if (hour === 0) {
            clearInterval(hrId);
          } else {
            setMin(60);
          }
        }, 1000);
      }
      if (hour === 0) {
        clearInterval(hrId);
      }
      if (hour === 0 && min === 0 && sec === 0) {
        clearInterval(hrId);
        clearInterval(minId);
        clearInterval(secId);
      }
    } else {
      clearInterval(secId);
      clearInterval(minId);
      clearInterval(hrId);
    }

    return () => {
      clearInterval(secId);
      clearInterval(minId);
      clearInterval(hrId);
    };
  }, [hour, min, sec, timeOn]);

  const handleStart = () => {
    setTimeOn(true);
  };

  const handleReset = () => {
    setHour(0);
    setMin(0);
    setSec(0);
    setTimeOn(false);
  };

  const handleStop = () => {
    setTimeOn(false);
  };

  return (
    <div>
      <h1>Timer</h1>
      <div className={style.inputDiv}>
        <input
          type="number"
          placeholder="00h"
          onChange={(e) => setHour(e.target.value)}
          value={hour}
        />
        <p>h</p>
        <input
          type="number"
          placeholder="00m"
          onChange={(e) => setMin(e.target.value)}
          value={min}
        />
        <p>m</p>
        <input
          type="number"
          placeholder="00"
          onChange={(e) => setSec(e.target.value)}
          value={sec}
        />
        <p>s</p>
      </div>
      <div className={style.timer}>
        <button className={style.start} onClick={handleStart}>
          START
        </button>
        <button onClick={handleStop}>STOP</button>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
}
