const mysql = require('mysql');

const db_connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'car_tijarat'
}); // default connectionLimit: 10

module.exports = db_connection;