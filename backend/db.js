const Pool = require("pg").Pool;

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  database: "dxcassignment",
});

module.exports = pool;
