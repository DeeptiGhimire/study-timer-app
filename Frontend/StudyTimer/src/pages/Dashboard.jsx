import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaClock, FaTasks, FaFire } from "react-icons/fa";
import StudyGoal from "../components/StudyGoal";
import Reminder from "../components/Reminder";
import StreakTracker from "../components/StreakTracker";
import { fetchDashboardData, formatDuration, getToken, getUser } from "../scripts/dashboard";
import "../css/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    totalTasks: 0,
    completedTasks: 0,
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const token = getToken();
      const data = await fetchDashboardData(token);
      setStats(data.stats);
      setRecentSessions(data.recentSessions);
    };
    loadData();
  }, []);

  const user = getUser();

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1 className="dashboard-title"><FaChartBar /> Dashboard</h1>
        <span className="welcome-name">Hi, {user?.name}</span>
      </div>

      <StreakTracker />
      <StudyGoal />
      <Reminder />

      <div className="stats-grid">
        <div className="stat-card">
          <FaClock className="stat-icon purple" />
          <div>
            <p className="stat-label">Total Study Time</p>
            <h2 className="stat-value">{stats.totalMinutes} min</h2>
          </div>
        </div>
        <div className="stat-card">
          <FaFire className="stat-icon orange" />
          <div>
            <p className="stat-label">Study Sessions</p>
            <h2 className="stat-value">{stats.totalSessions}</h2>
          </div>
        </div>
        <div className="stat-card">
          <FaTasks className="stat-icon blue" />
          <div>
            <p className="stat-label">Total Tasks</p>
            <h2 className="stat-value">{stats.totalTasks}</h2>
          </div>
        </div>
        <div className="stat-card">
          <FaChartBar className="stat-icon green" />
          <div>
            <p className="stat-label">Completed Tasks</p>
            <h2 className="stat-value">{stats.completedTasks}</h2>
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate("/timer")}><FaClock /> Go to Timer</button>
        <button onClick={() => navigate("/tasks")}><FaTasks /> Go to Tasks</button>
        <button onClick={() => navigate("/history")}><FaChartBar /> View History</button>
        <button onClick={() => navigate("/profile")}><FaChartBar /> My Profile</button>
      </div>

      <div className="recent-box">
        <h3 className="recent-title">Recent Study Sessions</h3>
        {recentSessions.length === 0 && (
          <p className="no-data">No sessions yet. Start the timer!</p>
        )}
        {recentSessions.map((s) => (
          <div key={s.id} className="session-row">
            <span className="session-subject">{s.subject}</span>
            <span className="session-duration">{formatDuration(s.duration)}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard; 