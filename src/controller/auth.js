const authModel = require('../models/auth');
const response = require('../middleware/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const permissionAdmin = [
  {
    menuName: 'overviewStaff',
    menuUrl: '/home',
    access: false,
  },
  {
    menuName: 'overviewAdmin',
    menuUrl: '/homehr',
    access: true,
  },
  {
    menuName: 'Absensi',
    menuUrl: '/absen',
    access: true,
  },
];

const permissionStaff = [
  {
    menuName: 'overviewStaff',
    menuUrl: '/home',
    access: true,
  },
  {
    menuName: 'overviewAdmin',
    menuUrl: '/homehr',
    access: false,
  },
  {
    menuName: 'Absensi',
    menuUrl: '/absen',
    access: true,
  },
];

const loginUser = async (req, res) => {
  try {
    // Panggil model authLogin untuk mendapatkan data pengguna
    const [userData] = await authModel.authLogin(req.body);

    if (userData) {
      const user = userData;

      // Memeriksa apakah kata sandi sesuai dengan yang ada di database
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (passwordIsValid) {
        // Jika kata sandi cocok, buat token JWT
        const token = jwt.sign({ id: user.id, role: user.role, }, config.secret, {
          algorithm: config.algorithm,
          expiresIn: config.expired,
        });

        // Atur permission pengguna berdasarkan peran (role)
        let userPermission = [];
        if (user.role === 'admin') {
          userPermission = permissionAdmin;
        } else {
          userPermission = permissionStaff;
        }


        // Kirim respons sukses bersama dengan token
        res.status(200).json(
          response.getStandardResponse(res.statusCode, 'Login Success', {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
            role: user.role,
            permission: userPermission,
          })
        );
      } else {
        // Jika kata sandi tidak cocok, kirim respons 401 (Unauthorized)
        res.status(401).json(
          response.getStandardResponse(res.statusCode, 'Invalid Password', null)
        );
      }
    } else {
      // Jika pengguna tidak ditemukan, kirim respons 401 (Unauthorized)
      res.status(401).json(
        response.getStandardResponse(res.statusCode, 'User not found', null)
      );
    }
  } catch (error) {
    console.error('Error in loginUser:', error);
    // Tangani kesalahan server dengan respons 500 (Internal Server Error)
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = {
  loginUser,
};
