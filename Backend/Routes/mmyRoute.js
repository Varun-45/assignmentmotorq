const express = require("express");
const { addmmy, getmmy, addcustomerdata, getcustomermmy, vehichleStatus } = require("../Controllers/mmyController")
const router = express.Router();
router.route('/').post(addmmy)
router.route('/').get(getmmy)
router.route('/customerdata').post(addcustomerdata)
router.route('/customerdata').get(getcustomermmy)
router.route('/acceptreject').post(vehichleStatus)
// router.route('/replycomment').post(comment)
module.exports = router;