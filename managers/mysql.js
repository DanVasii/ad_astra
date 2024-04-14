const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'polihack'
});


module.exports = pool;