const router=require('express').Router();
const controllers=require('../controllers/aucRoomController.js');

router.get('/room',controllers.auctionRoomData);
module.exports=router;