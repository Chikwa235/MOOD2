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
}
