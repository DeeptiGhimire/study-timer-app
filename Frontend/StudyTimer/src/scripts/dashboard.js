export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const formatDuration = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}m ${s}s`;
};

export const fetchDashboardData = async (token) => {
  try {
    const [timerRes, taskRes] = await Promise.all([
      fetch("/api/timer/history", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("/api/tasks/all", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const sessions = await timerRes.json();
    const tasks = await taskRes.json();

    const totalMinutes = Array.isArray(sessions)
      ? Math.floor(sessions.reduce((acc, s) => acc + s.duration, 0) / 60)
      : 0;

    const completedTasks = Array.isArray(tasks)
      ? tasks.filter((t) => t.status === "completed").length
      : 0;

    const stats = {
      totalSessions: Array.isArray(sessions) ? sessions.length : 0,
      totalMinutes,
      totalTasks: Array.isArray(tasks) ? tasks.length : 0,
      completedTasks,
    };

    const recentSessions = Array.isArray(sessions)
      ? sessions.slice(0, 5)
      : [];

    return { stats, recentSessions };
  } catch (err) {
    console.error(err);
    return {
      stats: {
        totalSessions: 0,
        totalMinutes: 0,
        totalTasks: 0,
        completedTasks: 0,
      },
      recentSessions: [],
    };
  }
}; 