import { useState, useEffect, useRef } from "react";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";
import "../css/Reminder.css";

function Reminder() {
  const [reminderTime, setReminderTime] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("reminderTime");
    if (saved) setReminderTime(Number(saved));
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setShowAlert(true);
            if (Notification.permission === "granted") {
              new Notification("StudyTimer Reminder", {
                body: "Time to take a break! You have been studying for a while.",
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    localStorage.setItem("reminderTime", reminderTime);
    setTimeLeft(reminderTime * 60);
    setIsActive(true);
    setShowAlert(false);
    setMessage(`Reminder set for ${reminderTime} minutes!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(0);
    setMessage("Reminder cancelled!");
    setTimeout(() => setMessage(""), 2000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="reminder-container">
      <h3 className="reminder-title"><FaBell /> Study Reminder</h3>

      {showAlert && (
        <div className="reminder-alert">
          <span>Time is up! Take a break!</span>
          <button onClick={() => setShowAlert(false)}><FaTimes /></button>
        </div>
      )}

      <div className="reminder-row">
        <input
          type="number"
          min="1"
          max="120"
          value={reminderTime}
          onChange={(e) => setReminderTime(Number(e.target.value))}
          className="reminder-input"
          disabled={isActive}
        />
        <span className="reminder-label">minutes</span>

        {!isActive ? (
          <button className="reminder-btn start" onClick={handleStart}>
            <FaBell /> Set Reminder
          </button>
        ) : (
          <button className="reminder-btn stop" onClick={handleStop}>
            <FaTimes /> Cancel
          </button>
        )}
      </div>

      {isActive && (
        <p className="reminder-countdown">
          Next reminder in: <strong>{formatTime(timeLeft)}</strong>
        </p>
      )}

      {message && <p className="reminder-message">{message}</p>}
    </div>
  );
}

export default Reminder; 