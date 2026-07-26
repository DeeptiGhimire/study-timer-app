export const getToken = () => {
  return localStorage.getItem("token");
};

export const fetchHistory = async (token) => {
  try {
    const res = await fetch("/api/timer/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (Array.isArray(data)) return data;
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const formatDuration = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateTotalMinutes = (sessions) => {
  return Math.floor(sessions.reduce((acc, s) => acc + s.duration, 0) / 60);
}; 