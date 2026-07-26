import { useState, useEffect } from "react";
import { FaHistory, FaClock, FaBook } from "react-icons/fa";
import {
  fetchHistory,
  formatDuration,
  formatDate,
  calculateTotalMinutes,
  getToken,
} from "../scripts/history";
import "../css/History.css";

function History() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      const token = getToken();
      const data = await fetchHistory(token);
      setSessions(data);
      setLoading(false);
    };
    loadHistory();
  }, []);

  const totalMinutes = calculateTotalMinutes(sessions);

  return (
    <div className="history-container">

      <div className="history-header">
        <h1 className="history-title"><FaHistory /> Study History</h1>
      </div>

      <div className="history-summary">
        <div className="summary-card">
          <FaHistory className="summary-icon" />
          <p className="summary-label">Total Sessions</p>
          <h2 className="summary-value">{sessions.length}</h2>
        </div>
        <div className="summary-card">
          <FaClock className="summary-icon" />
          <p className="summary-label">Total Study Time</p>
          <h2 className="summary-value">{totalMinutes} min</h2>
        </div>
      </div>

      <div className="history-list">
        {loading && <p className="no-data">Loading...</p>}
        {!loading && sessions.length === 0 && (
          <p className="no-data">No study sessions yet. Start the timer!</p>
        )}
        {sessions.map((s) => (
          <div key={s.id} className="history-card">
            <div className="history-left">
              <FaBook className="history-icon" />
              <div>
                <h3 className="history-subject">{s.subject}</h3>
                <p className="history-date">{formatDate(s.created_at)}</p>
              </div>
            </div>
            <div className="history-duration">
              <FaClock /> {formatDuration(s.duration)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default History; 