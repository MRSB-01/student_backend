const db = require("./db");

// SQL schema creation
const createTables = async () => {
  try {
    // Student table
    await db.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Marks table (normalized)
    await db.query(`
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES students(id) ON DELETE CASCADE,
        subject VARCHAR(100) NOT NULL,
        marks INT NOT NULL
      );
    `);

    console.log("📦 Database tables created (or already exist)");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

module.exports = createTables;
