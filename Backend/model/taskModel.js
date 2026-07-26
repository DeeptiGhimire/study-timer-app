import pool from "../database/db.js";

const createTaskTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(100) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      priority VARCHAR(20) DEFAULT 'medium',
      due_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
  console.log("Tasks table ready");
};

export default createTaskTable; 