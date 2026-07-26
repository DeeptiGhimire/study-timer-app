import { useState, useEffect, useRef } from "react";
import { FaClock } from "react-icons/fa";
import TimerControls from "../components/TimerControls";
import { getToken, getUser, formatTime, saveSession } from "../scripts/timer";
import "../css/Timer.css";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);
  const user = getUser();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    if (!subject) return setMessage("Please enter a subject first!");
    setMessage("");
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleStop = async () => {
    setIsRunning(false);
    setIsPaused(false);
    if (seconds === 0) return;
    const token = getToken();
    const result = await saveSession(token, subject, seconds);
    setMessage(result.message);
    setSeconds(0);
    setSubject("");
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
    setMessage("");
  };

  return (
    <div className="timer-container">

      <div className="timer-header">
        <h1 className="timer-title"><FaClock /> Study Timer</h1>
        <span className="welcome-text">Welcome, {user?.name}!</span>
      </div>

      <div className="timer-box">
        <div className="timer-display">{formatTime(seconds)}</div>

        <input
          type="text"
          className="subject-input"
          placeholder="Enter subject name..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isRunning}
        />

        {message && <p className="timer-message">{message}</p>}

        <TimerControls
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onReset={handleReset}
          isRunning={isRunning}
          isPaused={isPaused}
        />
      </div>

    </div>
  );
}

export default Timer; 