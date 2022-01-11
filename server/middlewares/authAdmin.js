const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

module.exports = (req, res, next) => {
  console.log("test");

  try {
    const token = req.cookies.token_data;

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const adminId = decodedToken.adminId;

    console.log(adminId);

    Admin.findOne({ _id: adminId })
      .then((admin) => {
        console.log("find one", admin._id.toString());

        if (admin._id.toString() == adminId) {
          next();
        } else {
          res.status(401).json({ error: err, isAuth: false });
        }
      })
      .catch((err) => {
        res.status(401).json({ error: err, isAuth: false });
      });
  } catch (err) {
    res.status(401).json({ error: err, isAuth: false });
  }
};
