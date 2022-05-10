const router=require('express').Router();
const controllers=require('../controllers/auctionController.js');

router.get('/auctions_list',controllers.getList);
router.get('/sellerslisting',controllers.getSellersListing);
router.get('/filter',controllers.filter);
router.post('/register_for_auction',controllers.register_for_auction);
router.delete('/auction',controllers.Delete_auction);

router.post('/registered_for_bidding',controllers.registered_for_bidding); // check if buyer has already register for a particular Auction
router.post('/register_for_bidding', controllers.register_for_bidding); // register buyer for a particular Auction

module.exports=router;