export const getToken = () => {
  return localStorage.getItem("token");
};

export const fetchTasks = async (token) => {
  try {
    const res = await fetch("/api/tasks/all", {
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

export const addTask = async (token, form) => {
  try {
    await fetch("/api/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    return { success: true, message: "Task added!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const updateTask = async (token, editId, form) => {
  try {
    await fetch(`/api/tasks/update/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...form, status: "pending" }),
    });
    return { success: true, message: "Task updated!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const deleteTask = async (token, id) => {
  try {
    await fetch(`/api/tasks/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, message: "Task deleted!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const completeTask = async (token, task) => {
  try {
    await fetch(`/api/tasks/update/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: task.title,
        subject: task.subject,
        priority: task.priority,
        due_date: task.due_date ? task.due_date.split("T")[0] : "",
        status: "completed",
      }),
    });
    return { success: true, message: "Task completed!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getFilteredTasks = (tasks, filterSubject) => {
  if (filterSubject === "all") return tasks;
  return tasks.filter((t) => t.subject === filterSubject);
};

export const getUniqueSubjects = (tasks) => {
  return [...new Set(tasks.map((t) => t.subject))];
}; 