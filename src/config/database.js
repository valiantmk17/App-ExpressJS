require('dotenv').config();
const sql = require('mssql');

// Konfigurasi koneksi ke MS SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Atur ke true jika Anda menggunakan koneksi SSL
  },
};

// Membuat pool koneksi
const dbPool = new sql.ConnectionPool(dbConfig);

// Membuka koneksi ke database
dbPool.connect()
  .then(() => {
    console.log('Connected to MS SQL Server');
  })
  .catch((err) => {
    console.error('Error connecting to MS SQL Server:', err);
  });

module.exports = dbPool;
