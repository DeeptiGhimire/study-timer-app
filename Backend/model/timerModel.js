import pool from "../database/db.js";

const createTimerTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS timer_sessions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      subject VARCHAR(100) NOT NULL,
      duration INTEGER NOT NULL,
      date DATE DEFAULT CURRENT_DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
  console.log("Timer sessions table ready");
};

export default createTimerTable;