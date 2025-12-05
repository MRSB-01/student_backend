const { Pool } = require("pg");
require("dotenv").config();

let pool;

if (process.env.DATABASE_URL) {
  // Neon / Vercel
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  console.log("Connected to NEON Postgres");
} else {
  // Local PostgreSQL
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,  // IMPORTANT
  });
  console.log("Connected to LOCAL Postgres");
}

module.exports = {
  query: (text, params) => pool.query(text, params),
};