export const getDarkMode = () => {
  return localStorage.getItem("darkMode") === "true";
};

export const saveDarkMode = (darkMode) => {
  localStorage.setItem("darkMode", darkMode);
};

export const applyDarkMode = (darkMode) => {
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

export const handleLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

export const menuItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/timer", label: "Timer" },
  { path: "/tasks", label: "Tasks" },
  { path: "/history", label: "History" },
  { path: "/profile", label: "Profile" },
]; 