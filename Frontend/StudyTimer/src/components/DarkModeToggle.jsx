import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../css/DarkMode.css";

function DarkModeToggle() {
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

  return (
    <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <FaSun className="toggle-icon" /> : <FaMoon className="toggle-icon" />}
    </button>
  );
}

export default DarkModeToggle; 