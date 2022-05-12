const router=require('express').Router();
const controllers=require('../controllers/userController.js');
router.post('/signup',controllers.signup);
router.post('/registerAsBuyer',controllers.registerAsBuyer);
router.post('/registerAsSeller',controllers.registerAsSeller);
module.exports=router;
// router.post('/registerAsSeller');
// router.post('/registerAsBidder')