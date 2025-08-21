import React, { useState, useEffect } from "react";

function BreathingExercise() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [text, setText] = useState("Breathe in...");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const sec = prev + 1;
        const cycle = sec % 12;

        if (cycle < 4) {
          setText("Breathe in...");
          setScale(1.3);
        } else if (cycle < 8) {
          setText("Hold...");
        } else {
          setText("Breathe out...");
          setScale(1);
        }

        return sec;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      setSeconds(0);
      setText("Breathe in...");
      setScale(1.3);
    }
  };

  const stop = () => {
    setIsRunning(false);
    setSeconds(0);
    setText("Timer: 0s");
    setScale(1);
  };

   return (
    <div className="section">
      <h2>🧘 Breathing Exercise</h2>
      <div id="breathingBox">
        <div
          id="breathingCircle"
          style={{ transform: `scale(${scale})`, transition: "transform 1s ease-in-out" }}
        ></div>
        <div id="breathingText">{text}</div>
        <div id="timer">
          Timer: {Math.floor(seconds / 60)} min {seconds % 60}s
        </div>
        <button onClick={start} className="control-btn">Start</button>
        <button onClick={stop} className="control-btn">Stop</button>
      </div>
    </div>
  );
}

export default BreathingExercise;
