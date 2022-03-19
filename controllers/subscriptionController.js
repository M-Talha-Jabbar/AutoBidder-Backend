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
    
}

module.exports={
    getSubs,subscribe
}