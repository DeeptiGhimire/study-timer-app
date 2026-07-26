import pool from "../database/db.js";

export const saveTimerSession = async (req, res) => {
  const { subject, duration } = req.body;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "INSERT INTO timer_sessions (user_id, subject, duration) VALUES ($1, $2, $3) RETURNING *",
      [userId, subject, duration]
    );
    res.status(201).json({ message: "Session saved", session: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTimerSessions = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT * FROM timer_sessions WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudyHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT subject, SUM(duration) as total_duration, COUNT(*) as sessions, date
       FROM timer_sessions WHERE user_id = $1
       GROUP BY subject, date ORDER BY date DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDailyGoal = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT SUM(duration) as today_total FROM timer_sessions
       WHERE user_id = $1 AND date = CURRENT_DATE`,
      [userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 