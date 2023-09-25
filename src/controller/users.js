const userModels = require('../models/users')

const getAllUsers = async (req, res) => {
	try{
		const dataDB = await userModels.getAllUsers();

		res.json({
			message: "GET all users success",
			data: dataDB,
		});
	}catch (error){
		res.status(500).json({
			message: "server error",
			serverMessage: error.message,
		})
	}
}

const createNewUser = async (req, res) => {
	try{
		await userModels.createNewUser(req.body);

		res.json({
			message: "CREATE new user success",
			body: req.body
		});
	}catch (error){
		res.status(500).json({
			message: "Server error",
			serverMessage: error.message,
		});
	}
}

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { body } = req;

  try {
    await userModels.updateUser(body, id);

    res.json({
      message: "UPDATE user success",
      body: {
        id: id,
        ...body
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await userModels.deleteUser(id);
    res.json({
      message: `DELETE user ID ${id} success`,
      body: null
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
	getAllUsers,
	createNewUser,
	updateUser,
	deleteUser,
}