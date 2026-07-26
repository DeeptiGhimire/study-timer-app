import pool from "../database/db.js";

const createGoalTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        daily_goal INTEGER NOT NULL DEFAULT 60,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Goals table ready");
  } catch (err) {
    console.error("Error creating goals table:", err.message);
  }
};

export default createGoalTable; 