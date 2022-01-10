const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin");

const authAdmin = require("../middlewares/authAdmin");

router.post("/login", adminCtrl.login);
router.post("/modification", adminCtrl.modification);
router.get("/all", authAdmin, adminCtrl.getAllUser)
router.get("/:id", authAdmin, adminCtrl.getOneUser)

module.exports = router;
