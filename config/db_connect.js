const mysql = require('mysql');

const db_connection = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: process.env.MYSQL_PORT
}); // default connectionLimit: 10

module.exports = db_connection;