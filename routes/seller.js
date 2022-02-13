var express = require('express');
var router = express.Router();

const sellerController = require('../controllers/sellerController');

router.get('/seller_history', sellerController.seller_history);

module.exports = router;