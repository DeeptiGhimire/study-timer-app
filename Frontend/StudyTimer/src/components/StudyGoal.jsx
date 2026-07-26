import { useState, useEffect } from "react";
import { FaBullseye, FaSave } from "react-icons/fa";
import "../css/StudyGoal.css";

function StudyGoal() {
  const [goal, setGoal] = useState(60);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGoal();
    fetchTodaySessions();
  }, []);

  const fetchGoal = async () => {
    try {
      const res = await fetch("/api/goals/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setGoal(data.daily_goal);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTodaySessions = async () => {
    try {
      const res = await fetch("/api/timer/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const today = new Date().toDateString();
        const todaySessions = data.filter(
          (s) => new Date(s.created_at).toDateString() === today
        );
        const totalSecs = todaySessions.reduce((acc, s) => acc + s.duration, 0);
        setTodayMinutes(Math.floor(totalSecs / 60));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("/api/goals/set", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ daily_goal: goal }),
      });
      setMessage("Goal saved!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  const percentage = Math.min(Math.round((todayMinutes / goal) * 100), 100);

  return (
    <div className="goal-container">
      <h3 className="goal-title"><FaBullseye /> Daily Study Goal</h3>

      <div className="goal-progress-wrap">
        <div className="goal-progress-bar">
          <div
            className="goal-progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="goal-progress-text">
          {todayMinutes} / {goal} min ({percentage}%)
        </p>
      </div>

      {percentage >= 100 && (
        <p className="goal-achieved">Goal achieved today!</p>
      )}

      <div className="goal-input-row">
        <input
          type="number"
          min="1"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          className="goal-input"
          placeholder="Set daily goal in minutes"
        />
        <button className="goal-save-btn" onClick={handleSave}>
          <FaSave /> Save Goal
        </button>
      </div>
      {message && <p className="goal-message">{message}</p>}
    </div>
  );
}

export default StudyGoal; 