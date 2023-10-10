const dbPool = require('../config/database');

const getAllAttendance = async () => {
  try {
    const result = await dbPool.query('SELECT * FROM attendance');
    return result.recordset;
  } catch (error) {
    throw error;
  }
}

const createNewAttendance = async (id_users, date, status) => {
  try {
    const sqlQuery = `
      INSERT INTO attendance (id_users, date, status)
      VALUES (@id_users, @date, @status)
    `;

    const result = await dbPool.query(sqlQuery, {
      replacements: {
        id_users,
        date,
        status,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};


const updateAttendance = async (id, date, status) => {
  const sqlQuery = `
    UPDATE attendance
    SET date = @date, status = @status
    WHERE id = @id
  `;

  try {
    const result = await dbPool.query(sqlQuery, {
      replacements: {
        id,
        date,
        status,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteAttendance = async (id) => {
  const sqlQuery = `
    DELETE FROM attendance
    WHERE id = @id
  `;

  try {
    const result = await dbPool.query(sqlQuery, {
      replacements: {
        id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAttendance,
  createNewAttendance,
  updateAttendance,
  deleteAttendance,
};
