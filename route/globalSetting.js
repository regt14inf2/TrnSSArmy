const express = require('express');

const router  = express.Router();
const {search, insert, update, deleted} = require('../controller/GloabalSetting');
const { verifyToken } = require('../model/jwt');

//search
router.post('/searchGlobalSetting', search);
//add
router.post('/insertGlobalSetting', verifyToken, insert);
//edit
router.put('/updateGlobalSetting', verifyToken, update);
//delete
router.delete('/deleteGlobalSetting', verifyToken, deleted);

module.exports = router;