const mysql = require('mysql');

const db_connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}); // default connectionLimit: 10

module.exports = db_connection;