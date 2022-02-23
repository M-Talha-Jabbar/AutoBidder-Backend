var express = require('express');
var router = express.Router();

const vehicleController = require('../controllers/vehicleController');
const { reportValidationRules, validate } = require('../validator');

router.get('/vehicle/report/:RegNo', vehicleController.vehicle_report);

router.post('/vehicle/create_report', reportValidationRules(), validate, vehicleController.vehicle_report_create);
// router.get('/vehicle/getAll',vehicleController.getVehicle);
module.exports = router;