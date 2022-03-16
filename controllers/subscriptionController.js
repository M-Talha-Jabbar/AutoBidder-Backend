const Subscription=require("../models/subscriptionModel");
const JWT=require('jsonwebtoken');
async function getSubs(req,res,next){
    if(!req.body.UserCNIC){
        res.status(401).end("User id must be provided")
        
    }
    const subModel=new Subscription();
    try{
        const result=await subModel.getSubscriptions(req.body.UserCNIC);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(200).json(false);
        }
    }catch(e){
        res.status(500).end(e.message)
    }

}
async function subscribe(req,res){
    if(!req.body.RegID||!req.body.AuctionID){
      return  res.status(400).send("Invalid Request");
    }
    try{
        const subModel=new Subscription();
        const user=JWT.verify(req.cookies.jwt,process.env.JWT_KEY);
        if(user.CNIC)
        {
           const biddingId=await subModel.subscribe(user.CNIC,req.body.AuctionID,req.body.RegID);
           res.status(200).json(biddingId);
        }else{
            res.status(403).send(e.message);
        }
    
    }catch(e){
        console.log(e.message);
        res.status(403).send(e.message);
    }
}
module.exports={
    getSubs,subscribe
}