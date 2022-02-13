var express = require('express');
var router = express.Router();

const complaintController = require('../controllers/complaintController');
const { postComplaintValidationRules, validate, putComplaintValidationRules } = require('../validator');

router.post('/complaint', postComplaintValidationRules(), validate, complaintController.user_complaint_create);

router.put('/complaint/:complaintId', putComplaintValidationRules(), validate, complaintController.user_complaint_update);

router.delete('/complaint/:complaintId', complaintController.user_complaint_delete);

router.get('/complaints/', complaintController.user_complaints);

module.exports = router;