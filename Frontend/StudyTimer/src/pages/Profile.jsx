import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaClock, FaTasks, FaEdit, FaSave } from "react-icons/fa";
import {
  getToken,
  getStoredUser,
  fetchProfileStats,
  updateUserName,
} from "../scripts/profile";
import "../css/Profile.css";

function Profile() {
  const [user, setUser] = useState(() => getStoredUser());
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    totalTasks: 0,
    completedTasks: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(() => getStoredUser()?.name || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = getToken();
    fetchProfileStats(token).then((data) => setStats(data));
  }, []);

  const handleSave = async () => {
    const token = getToken();
    const result = await updateUserName(token, user, name);
    if (!result.success) {
      setMessage(result.message);
    } else {
      setUser(result.updatedUser);
      setEditMode(false);
      setMessage("Profile updated successfully!");
    }
  };

  return (
    <div className="profile-container">

      <div className="profile-header">
        <h1 className="profile-title"><FaUser /> My Profile</h1>
      </div>

      {message && <p className="profile-message">{message}</p>}

      <div className="profile-card">
        <div className="avatar-circle">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          {editMode ? (
            <div className="edit-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
                placeholder="Enter your name"
              />
              <button className="save-btn" onClick={handleSave}>
                <FaSave /> Save
              </button>
            </div>
          ) : (
            <div className="name-row">
              <h2 className="profile-name">{user?.name}</h2>
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                <FaEdit /> Edit
              </button>
            </div>
          )}
          <p className="profile-email"><FaEnvelope /> {user?.email}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="pstat-card">
          <FaClock className="pstat-icon purple" />
          <p className="pstat-label">Study Time</p>
          <h3 className="pstat-value">{stats.totalMinutes} min</h3>
        </div>
        <div className="pstat-card">
          <FaClock className="pstat-icon orange" />
          <p className="pstat-label">Sessions</p>
          <h3 className="pstat-value">{stats.totalSessions}</h3>
        </div>
        <div className="pstat-card">
          <FaTasks className="pstat-icon blue" />
          <p className="pstat-label">Total Tasks</p>
          <h3 className="pstat-value">{stats.totalTasks}</h3>
        </div>
        <div className="pstat-card">
          <FaTasks className="pstat-icon green" />
          <p className="pstat-label">Completed</p>
          <h3 className="pstat-value">{stats.completedTasks}</h3>
        </div>
      </div>

    </div>
  );
}

export default Profile; 