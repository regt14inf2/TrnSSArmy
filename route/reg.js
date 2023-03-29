const express = require('express');

const router  = express.Router()
// const { registerController, loginController} = require('../controller/userController');
const { registerNewSoldier,submitRegNewSoldier } = require('../controller/registerNewSoldier');
// const { verifyToken } = require('../model/jwt');

// router.post('/register', verifyToken, registerController);
// router.post('/login', loginController);

// //registerNewUser
router.post('/regNewSoldier', registerNewSoldier);
router.post('/submitRegNewSoldier', submitRegNewSoldier);

module.exports = router;