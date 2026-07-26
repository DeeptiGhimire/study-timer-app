import pool from "../database/db.js";

export const setGoal = async (req, res) => {
  const { daily_goal } = req.body;
  const userId = req.user.id;
  try {
    const existing = await pool.query("SELECT * FROM goals WHERE user_id = $1", [userId]);
    if (existing.rows.length > 0) {
      const result = await pool.query(
        "UPDATE goals SET daily_goal=$1 WHERE user_id=$2 RETURNING *",
        [daily_goal, userId]
      );
      return res.json({ message: "Goal updated", goal: result.rows[0] });
    }
    const result = await pool.query(
      "INSERT INTO goals (user_id, daily_goal) VALUES ($1, $2) RETURNING *",
      [userId, daily_goal]
    );
    res.status(201).json({ message: "Goal set", goal: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGoal = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query("SELECT * FROM goals WHERE user_id = $1", [userId]);
    if (result.rows.length === 0) return res.json({ daily_goal: 60 });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 