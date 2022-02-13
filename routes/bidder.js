var express = require('express');
var router = express.Router();

const bidderController = require('../controllers/bidderController');

router.get('/membership_type', bidderController.bidder_membership_types);
//router.post('/membership_type', bidderController.bidder_membership_subscription);
router.get('/bidder_history', bidderController.bidder_history);

module.exports = router;