import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaCheck, FaClock, FaBook, FaFilter } from "react-icons/fa";
import {
  getToken,
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  getFilteredTasks,
  getUniqueSubjects,
} from "../scripts/tasks";
import "../css/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", subject: "", priority: "medium", due_date: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  useEffect(() => {
    const loadTasks = async () => {
      const token = getToken();
      const data = await fetchTasks(token);
      setTasks(data);
    };
    loadTasks();
  }, []);

  const filtered = getFilteredTasks(tasks, filterSubject);
  const subjects = getUniqueSubjects(tasks);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.subject) return setMessage("Title and subject are required!");
    const token = getToken();
    let result;
    if (editId) {
      result = await updateTask(token, editId, form);
      setEditId(null);
    } else {
      result = await addTask(token, form);
    }
    setMessage(result.message);
    setForm({ title: "", subject: "", priority: "medium", due_date: "" });
    const data = await fetchTasks(token);
    setTasks(data);
  };

  const handleDelete = async (id) => {
    const token = getToken();
    const result = await deleteTask(token, id);
    setMessage(result.message);
    const data = await fetchTasks(token);
    setTasks(data);
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setForm({
      title: task.title,
      subject: task.subject,
      priority: task.priority,
      due_date: task.due_date ? task.due_date.split("T")[0] : "",
    });
  };

  const handleComplete = async (task) => {
    const token = getToken();
    const result = await completeTask(token, task);
    setMessage(result.message);
    const data = await fetchTasks(token);
    setTasks(data);
  };

  return (
    <div className="tasks-container">

      <h2 className="tasks-title"><FaBook /> Task Manager</h2>

      {message && <p className="task-message">{message}</p>}

      <div className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />
        <button className="add-btn" onClick={handleSubmit}>
          {editId ? <><FaEdit /> Update</> : <><FaPlus /> Add Task</>}
        </button>
      </div>

      <div className="filter-row">
        <FaFilter className="filter-icon" />
        <span className="filter-label">Filter by Subject:</span>
        <select
          className="filter-select"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="all">All Subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="task-list">
        {filtered.length === 0 && <p className="no-tasks">No tasks found!</p>}
        {filtered.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.status === "completed" ? "completed" : ""}`}
          >
            <div className="task-info">
              <h3>{task.title}</h3>
              <p><FaBook /> {task.subject}</p>
              <p><FaClock /> {task.due_date ? task.due_date.split("T")[0] : "No due date"}</p>
              <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
              <span className={`status-badge ${task.status}`}>{task.status}</span>
            </div>
            <div className="task-actions">
              <button className="complete-btn" onClick={() => handleComplete(task)}><FaCheck /></button>
              <button className="edit-btn" onClick={() => handleEdit(task)}><FaEdit /></button>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Tasks;  