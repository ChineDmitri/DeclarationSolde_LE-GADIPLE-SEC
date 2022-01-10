const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// router.get("/test", userCtrl.test)
router.post("/create", userCtrl.create)

module.exports = router;