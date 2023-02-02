const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Mannawaterbottle5!",
  host: "localhost",
  port: 5432,
  database: "reduxposts",
});

module.exports = pool;
