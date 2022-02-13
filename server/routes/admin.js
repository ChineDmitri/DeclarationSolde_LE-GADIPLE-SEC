const express = require('express');

const router = express.Router();

const adminCtrl = require('../controllers/admin');

const authAdmin = require('../middlewares/authAdmin');

router.post('/login', adminCtrl.login);
router.get('/isAuth', adminCtrl.cookieHandler);
router.post('/modificationPassword', authAdmin, adminCtrl.modificationPassword);
router.get('/user/all', authAdmin, adminCtrl.getAllUser);
router.get('/user/:id', authAdmin, adminCtrl.getOneUser);
router.delete('/user/:id', authAdmin, adminCtrl.deleteOneUser);

// router.get('/getFile', authAdmin, adminCtrl.getFile);

module.exports = router;
