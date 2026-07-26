import { useNavigate, useLocation } from "react-router-dom";
import { FaChartBar, FaClock, FaTasks, FaHistory, FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const menuItems = [
    { path: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    { path: "/timer", icon: <FaClock />, label: "Timer" },
    { path: "/tasks", icon: <FaTasks />, label: "Tasks" },
    { path: "/history", icon: <FaHistory />, label: "History" },
    { path: "/profile", icon: <FaUser />, label: "Profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="dark-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar; 