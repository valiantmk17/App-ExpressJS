const dbPool = require('../config/database');

const getAllAttendance = async () => {
  try {
    const result = await dbPool.query('SELECT * FROM attendance');
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

const getIdAttendance = async (userId) => {
  try {
    const result = await dbPool.query(`SELECT * FROM attendance WHERE id_users = '${userId}' `)
    return result.recordset
  } catch (error) {
    throw error
  }
};

const checkAttendance = async (userId, date) => {
  try {
    const request = dbPool.request();
    request.input('userId', sql.VarChar, userId);
    request.input('date', sql.Date, date);

    const result = await request.query(`SELECT * FROM attendance WHERE id_users = @userId AND date = @date`);

    return result.recordset.length > 0;
  } catch (error) {
    throw error;
  }
};

const getAttendanceStatus = async (userId, date) => {
  try {
    const request = dbPool.request();
    request.input('userId', sql.VarChar, userId);
    request.input('date', sql.Date, date);

    const result = await request.query(`SELECT TOP 1 status FROM attendance WHERE id_users = @userId AND date = @date ORDER BY id DESC`);

    return result.recordset.length > 0 ? result.recordset[0].status : null;
  } catch (error) {
    throw error;
  }
};

const createNewAttendance = async (userId, userName, date, status) => {
  try {
    const sqlQuery = `
      INSERT INTO attendance (id_users, user_name, date, status)
      VALUES ('${userId}', '${userName}', '${date}', '${status}')
    `;

    const result = await dbPool.query(sqlQuery, {
        userId,
        userName,
        date,
        status,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const updateAttendance = async (id, date, status) => {
  const sqlQuery = `
    UPDATE attendance
    SET date = '${date}', status = '${status}'
    WHERE id = '${id}'
  `;

  try {
    const result = await dbPool.query(sqlQuery, {
        id,
        date,
        status,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteAttendance = async (id) => {
  const sqlQuery = `
    DELETE FROM attendance
    WHERE id = '${id}'
  `;

  try {
    const result = await dbPool.query(sqlQuery, {
        id,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAttendance,
  getIdAttendance,
  checkAttendance,
  createNewAttendance,
  updateAttendance,
  deleteAttendance,
};
