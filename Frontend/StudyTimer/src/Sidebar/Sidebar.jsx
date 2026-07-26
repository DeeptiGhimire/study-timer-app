import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChartBar, FaClock, FaTasks,
  FaHistory, FaUser, FaSignOutAlt,
  FaMoon, FaSun,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  getDarkMode,
  saveDarkMode,
  applyDarkMode,
  handleLogout,
  menuItems,
} from "../scripts/sidebar";
import "./Sidebar.css";

const iconMap = {
  "/dashboard": <FaChartBar />,
  "/timer": <FaClock />,
  "/tasks": <FaTasks />,
  "/history": <FaHistory />,
  "/profile": <FaUser />,
};

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => getDarkMode());

  useEffect(() => {
    applyDarkMode(darkMode);
    saveDarkMode(darkMode);
  }, [darkMode]);

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <FaClock className="logo-icon" />
        <span className="logo-text">StudyTimer</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{iconMap[item.path]}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}

        <button
          className="nav-item dark-item"
          onClick={() => setDarkMode(!darkMode)}
        >
          <span className="nav-icon">{darkMode ? <FaSun /> : <FaMoon />}</span>
          <span className="nav-label">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button
          className="nav-item logout-item"
          onClick={() => handleLogout(navigate)}
        >
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Logout</span>
        </button>
      </nav>

    </div>
  );
}

export default Sidebar; 