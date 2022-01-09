const Admin = require("../models/Admin");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.modification = (req, res, next) => {
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
            message: "Password was changed!",
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

exports.login = (req, res, next) => {
  console.log(process.env.ADMIN_ID);

  Admin.findOne({ _id: process.env.ADMIN_ID })
    .then((admin) => {
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Password is wrong!" });
          }

          const token = jwt.sign({ adminId: admin._id }, process.env.JWT_KEY);

          res.cookie("token", token, {
            maxAge: 60000 * 60,
            httpOnly: true,
            // secure: true,
          });

          res.status(200).json({
            message: "Auth -> OK",
            auth: true,
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