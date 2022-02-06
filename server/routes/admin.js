const express = require('express');

const router = express.Router();

const adminCtrl = require('../controllers/admin');

const authAdmin = require('../middlewares/authAdmin');

router.post('/login', adminCtrl.login);
router.get('/isAuth', adminCtrl.cookieHandler);
router.post('/modification', authAdmin, adminCtrl.modification);
router.get('/user/all', authAdmin, adminCtrl.getAllUser);
router.get('/user/:id', authAdmin, adminCtrl.getOneUser);
router.get('/getFile', authAdmin, adminCtrl.getFile);

module.exports = router;
