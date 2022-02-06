const Admin = require('../models/Admin');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

exports.modification = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashPassword) => {
      const admin = new Admin({
        password: hashPassword,
      });

      admin
        .save()
        .then(() => {
          res.status(201).json({
            message: 'Password was changed!',
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(444).json(err);
    });
};

exports.login = (req, res) => {
  console.log(process.env.ADMIN_ID);

  Admin.findOne({ _id: process.env.ADMIN_ID })
    .then((admin) => {
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: 'Password is wrong!' });
          }

          const acces_token = jwt.sign({ adminId: admin._id }, process.env.JWT_KEY);

          res.cookie('token_data', acces_token, {
            maxAge: 60000 * 60,
            httpOnly: true,
            // secure: true,
          });

          res.status(200).json({
            message: 'Auth -> OK',
            isAuth: true,
          });
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getAllUser = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({ isAuth: true, users });
    })
    .catch((err) => {
      res.status(500).json({ isAuth: true, err });
    });
};

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(200).json({ isAuth: true, user });
    })
    .catch((err) => {
      res.status(500).json({ isAuth: true, err });
    });
};

// Creation Excel file 'xlsx' with user
exports.getFile = (req, res) => {
  const file_dir = path.join(__dirname, '..', 'public', 'test.xlsx');

  console.log(file_dir);

  res.sendFile(file_dir);
};

exports.cookieHandler = (req, res) => {
  try {
    const token = req.cookies.token_data;

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const adminId = decodedToken.adminId;

    if (adminId) {
      res.status(200).json({ isAuth: true });
    } else {
      throw 'You are not administrator!';
    }
  } catch (err) {
    res.status(401).json({ ...err, isAuth: false });
  }
};
