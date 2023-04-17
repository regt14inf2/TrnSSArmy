const express = require('express');

const router  = express.Router()
const {getSoldierlistDB, getSoldierByIdDB, updateSoldierByIdDB}= require('../controller/soldierlist');
const {verifyToken} = require('../model/jwt');

router.post ('/soldier',verifyToken, getSoldierlistDB);
router.post ('/soldierbyid',verifyToken, getSoldierByIdDB);
router.put ('/updateSoldier',verifyToken, updateSoldierByIdDB);
module.exports = router;