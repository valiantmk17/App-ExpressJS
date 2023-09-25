require('dotenv').config();
const sql = require('mssql');
const { ConnectionPool } = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Non-SSL connection
  },
};

sql.connect(config, function (error) {
  if (error) console.log(error);
  else console.log('Connected to SQL Server');
});

module.exports = sql;