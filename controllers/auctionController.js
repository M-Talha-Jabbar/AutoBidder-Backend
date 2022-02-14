
const auctionModel = require('../models/auctionModel.js');

async function getList(req, res, next) {    //
    const auction = new auctionModel();
    try {
        const result = await auction.getall();
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
        res.json(true);
        else
        res.json(false)
    }catch(err){
        res.status(500).send(err.message);
    }

}
module.exports = {
    getList,
    filter,
    register_for_auction,
    Delete_auction,
    registered_for_bidding
}