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
        res.status(500).end(e.message);
    }

}

async function subscribe(req,res){
    if(!req.body.UserCNIC){
        res.status(401).end("User id must be provided");
    }

    const subModel = new Subscription(req.body.typeID);

    if(await subModel.alreadyRegister(req.body.UserCNIC)){
        res.status(200).json({ error: "You are already registered!" });
    }

    else{
        try{
            const result = await subModel.subscribe(req.body.UserCNIC);
            res.status(200).json({ result: "Successfully Subscribed!" });
        }
        catch(e){
            res.status(500).end(e.message);
        }
    }
}

module.exports={
    getSubs,subscribe
}