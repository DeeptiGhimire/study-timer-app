export const getToken = () => {
  return localStorage.getItem("token");
};

export const getStoredUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const fetchProfileStats = async (token) => {
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
    return {
      totalSessions: Array.isArray(sessions) ? sessions.length : 0,
      totalMinutes,
      totalTasks: Array.isArray(tasks) ? tasks.length : 0,
      completedTasks,
    };
  } catch (err) {
    console.error(err);
    return { totalSessions: 0, totalMinutes: 0, totalTasks: 0, completedTasks: 0 };
  }
};

export const updateUserName = async (token, user, name) => {
  try {
    const res = await fetch("/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };
    const updatedUser = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return { success: true, updatedUser };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
}; 