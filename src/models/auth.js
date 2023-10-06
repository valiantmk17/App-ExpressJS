const dbPool = require('../config/database');
const sql = require('mssql');

const authLogin = async (body) => {
    const sqlQuery = 'SELECT id, name, email, role, password FROM users WHERE email = @email';

    try {
        console.log('Input data:', body); // Menampilkan data input ke dalam console log
        const request = dbPool.request();
        request.input('email', sql.VarChar, body.email); // Parameterisasi query untuk mencegah SQL Injection

        const result = await request.query(sqlQuery);
        console.log('Result:', result.recordset); // Menampilkan hasil query ke dalam console log
        return result.recordset;
    } catch (error) {
        console.error('Error in authLogin:', error);
        throw error;
    }
};

module.exports = {
    authLogin
};
