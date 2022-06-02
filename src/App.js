import { useState } from "react";
import "./App.css";
import Stopwatch from "./Components/Stopwatch";

// import Watch from './Components/Timer';
import Timer from "./Components/Timer";

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="OuterDiv">
      <div className="App">
        <div className="mainDiv">
          <button onClick={() => setIsActive(true)}>Timer</button>
          <button onClick={() => setIsActive(false)}>StopWatch</button>
        </div>

        <div className="resultdiv">{isActive ? <Timer /> : <Stopwatch />}</div>
      </div>
    </div>
  );
}

export default App;
