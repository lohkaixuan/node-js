const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use Neon PostgreSQL URL
  
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to Neon PostgreSQL:", err);
  } else {
    console.log("Connected to Neon DB! Current time:", res.rows[0]);
  }
});

module.exports = { pool };
