import { useState, useEffect } from "react";
import { FaFire, FaCalendarCheck, FaTrophy } from "react-icons/fa";
import "../css/StreakTracker.css";

function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [studiedToday, setStudiedToday] = useState(false);
  const [last7Days, setLast7Days] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStreakData();
  }, []);

  const fetchStreakData = async () => {
    try {
      const res = await fetch("/api/timer/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sessions = await res.json();
      if (!Array.isArray(sessions)) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const studyDays = new Set(
        sessions.map((s) => {
          const d = new Date(s.created_at);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        })
      );

      const todayTime = today.getTime();
      setStudiedToday(studyDays.has(todayTime));

      let currentStreak = 0;
      let checkDay = new Date(today);
      if (!studyDays.has(todayTime)) {
        checkDay.setDate(checkDay.getDate() - 1);
      }
      while (studyDays.has(checkDay.getTime())) {
        currentStreak++;
        checkDay.setDate(checkDay.getDate() - 1);
      }
      setStreak(currentStreak);

      let longest = 0;
      let current = 0;
      const sortedDays = [...studyDays].sort();
      for (let i = 0; i < sortedDays.length; i++) {
        if (i === 0) {
          current = 1;
        } else {
          const diff = sortedDays[i] - sortedDays[i - 1];
          if (diff === 86400000) {
            current++;
          } else {
            current = 1;
          }
        }
        if (current > longest) longest = current;
      }
      setLongestStreak(longest);

      const last7 = [];
      for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(day.getDate() - i);
        day.setHours(0, 0, 0, 0);
        last7.push({
          date: day,
          studied: studyDays.has(day.getTime()),
          label: day.toLocaleDateString("en-US", { weekday: "short" }),
        });
      }
      setLast7Days(last7);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="streak-container">
      <h3 className="streak-title"><FaFire /> Study Streak</h3>

      <div className="streak-stats">
        <div className="streak-stat">
          <FaFire className="streak-stat-icon fire" />
          <h2 className="streak-number">{streak}</h2>
          <p className="streak-label">Current Streak</p>
        </div>
        <div className="streak-stat">
          <FaTrophy className="streak-stat-icon trophy" />
          <h2 className="streak-number">{longestStreak}</h2>
          <p className="streak-label">Longest Streak</p>
        </div>
        <div className="streak-stat">
          <FaCalendarCheck className="streak-stat-icon check" />
          <h2 className="streak-number">{studiedToday ? "Yes" : "No"}</h2>
          <p className="streak-label">Studied Today</p>
        </div>
      </div>

      <div className="streak-week">
        <p className="streak-week-title">Last 7 Days</p>
        <div className="streak-days">
          {last7Days.map((day, index) => (
            <div key={index} className="streak-day">
              <div className={`streak-dot ${day.studied ? "active" : "inactive"}`}></div>
              <span className="streak-day-label">{day.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreakTracker; 