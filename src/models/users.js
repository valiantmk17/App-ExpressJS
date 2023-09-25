const dbPool = require('../config/database');
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
	try{
		const result = await dbPool.query('SELECT * FROM users');
		return result.recordset;
	}catch (error){
		throw error;
	}
}

const createNewUser = async (body) => {
	const { name, email, password, role } = body;
	const encryptedPassword = bcrypt.hashSync(body.password, 8)
	const sqlQuery = `INSERT INTO users (name, email, password, role) VALUES ('${body.name}','${body.email}','${encryptedPassword}','${role}')`;

	try{
		const result = await dbPool.query(sqlQuery, {
			name,
			email,
			password,
			role,
		});

		return result;
	}catch (error){
		throw error
	}
};

const updateUser = async (body, id) => {
  const { name, email, password, role } = body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const sqlQuery = `UPDATE users SET name = '${name}', email = '${email}', password = '${hashedPassword}', role = '${role}' WHERE id = '${id}'`;

  try {
    const result = await dbPool.query(sqlQuery);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
	const sqlQuery = `DELETE FROM users WHERE id=${id}`;

	try {
		const result = await dbPool.query(sqlQuery);
	} catch (error) {
		throw error;
	}
};


module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
};	