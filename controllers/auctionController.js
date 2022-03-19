const JWT=require('jsonwebtoken');
const auctionModel = require('../models/auctionModel.js');

async function getList(req, res, next) {    
    const auction = new auctionModel();
    try {
        let result
        if(req.query.search)
        result=await auction.getall(req.query.search)
        else
        result = await auction.getall();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
async function getSellersListing(req, res, next) {    
    const auction = new auctionModel();
    if(!req.query.sellerID){
        res.status(401).send("Invalid Request")
    }
    try {
        const result = await auction.sellerAuctions(req.query.sellerID);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
async function filter(req, res, next) {
    const auction = new auctionModel();
    if (!Object.keys(req.query)[0])
        return res.status(400).json("Invalid Filter");
    const field = Object.keys(req.query);
    const value = Object.values(req.query);
    try {
        const result = await auction.filters(field, value);
        return res.json(result);
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}
async function register_for_auction(req, res, next) {
    if (!req.body)
        res.status(400).json("Invalid request");
    const auction = new auctionModel(req.body);
    try {
        const result = await auction.insert();
        res.json(JSON.stringify(result));
    } catch (err) {
        res.status(400).json(err.message);
    }

}
async function Delete_auction(req, res, next) {
    const auction = new auctionModel();
    if (!req.query.Id)
        return res.status(400).json("Invalid request");
    try {
        const result = await auction.DeleteAuction(req.query.Id);
        if (result.affectedRows > 0)
            return res.status(200).json("Auction Deleted Sucessfully");
        return res.status(500).json("No such auction found");

    }
    catch (err) {
        res.status(400).json(err.message);
    }
}
async function registered_for_bidding(req,res,next){
    console.log(req.body)
    if(!(req.body.AuctionId&&req.body.UserCNIC))
    return res.status(400).send("Invalid request");
    const auction=new auctionModel();
    try{
        const result=await auction.IsRegisteredForBidding(req.body.AuctionId,req.body.UserCNIC);
        if(result)
        res.json(result[0]);
        else
        res.json(false)
    }catch(err){
        res.status(500).send(err.message);
    }

}

async function register_for_bidding(req, res, next){
    if(!req.body.RegID||!req.body.AuctionID){
        return  res.status(400).send("Invalid Request");
      }
      try{
          const auction = new auctionModel();
          const user=JWT.verify(req.cookies.jwt,process.env.JWT_KEY);
          if(user.CNIC)
          {
             const biddingId = await auction.registerForBidding(user.CNIC,req.body.AuctionID,req.body.RegID);
             res.status(200).json(biddingId);
          }else{
              res.status(403).send(e.message);
          }
      
      }catch(e){
          console.log(e.message);
          res.status(403).send(e.message);
      }
}

module.exports = {
    getSellersListing,
    getList,
    filter,
    register_for_auction,
    Delete_auction,
    registered_for_bidding,
    register_for_bidding
}