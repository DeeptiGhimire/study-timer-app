export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const formatTime = (secs) => {
  const h = Math.floor(secs / 3600).toString().padStart(2, "0");
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export const saveSession = async (token, subject, seconds) => {
  try {
    await fetch("/api/timer/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subject, duration: seconds }),
    });
    return { success: true, message: "Session saved successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to save session." };
  }
}; 