const express = require('express');

const router  = express.Router()

const { verifyToken } = require('../model/jwt');

const {getColumnDB, importSoldierListDB} = require('../controller/import');

router.post('/getColumn', verifyToken, getColumnDB);
router.post('/importSoldierList', verifyToken, importSoldierListDB);

module.exports = router;