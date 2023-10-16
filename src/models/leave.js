const dbPool = require('../config/database');

const getAllLeave = async () => {
  try {
    const result = await dbPool.query('SELECT * FROM leave')
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

const getIdLeave = async (userId) => {
  try {
    const result = await dbPool.query(`SELECT * FROM leave WHERE id_users = '${userId}' `)
    return result.recordset
  } catch (error) {
    throw error
  }
};

const createNewLeave = async (userId, userName, role, type, reason, date, period, phone, emergency) => {
  try {
    const sqlQuery = `
      INSERT INTO leave (id_users, name, role, type, reason, date, period, phone, emergency) 
      VALUES ('${userId}', '${userName}', '${role}', '${type}', '${reason}', '${date}', '${period}', '${phone}', '${emergency}')
    `;

    const result = await dbPool.query(sqlQuery, {
        userId,
        userName,
        role,
        type,
        reason,
        date,
        period,
        phone,
        emergency,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const updateLeave = async (id, role, type, reason, date, period, phone, emergency, status) => {
  const sqlQuery = `
    UPDATE leave 
    SET role='${role}', type='${type}', reason='${reason}', date='${date}', period='${period}', phone='${phone}', emergency='${emergency}', status='${status}' 
    WHERE id='${id}'
    `;

  try {
    const result = await dbPool.query(sqlQuery, {
        id,
        role,
        type,
        reason,
        date,
        period,
        phone,
        emergency,
        status,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteLeave = async (id) => {
  const sqlQuery = `
    DELETE FROM leave 
    WHERE id='${id}'
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
  getAllLeave, // Perbarui nama fungsi ini untuk sesuai dengan nama yang benar
  getIdLeave,
  createNewLeave,
  updateLeave,
  deleteLeave,
};