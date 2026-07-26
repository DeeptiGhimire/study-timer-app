import pool from "../database/db.js";

export const addTask = async (req, res) => {
  const { title, subject, priority, due_date } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, title, subject, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, title, subject, priority || "medium", due_date || null]
    );
    res.status(201).json({ message: "Task added", task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, subject, priority, due_date, status } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title=$1, subject=$2, priority=$3, due_date=$4, status=$5 WHERE id=$6 AND user_id=$7 RETURNING *",
      [title, subject, priority || "medium", due_date || null, status || "pending", id, userId]
    );
    res.json({ message: "Task updated", task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await pool.query("DELETE FROM tasks WHERE id=$1 AND user_id=$2", [id, userId]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 