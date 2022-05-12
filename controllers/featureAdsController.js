const FeatureAds=require('../models/featureAdsModel');
async function getfeatureads(req,res,next ){
    const featureAds=new FeatureAds();
    try{
        const result=await featureAds.getAds();
        res.json(result);
    }catch(err){
        res.status(500).send(err.message);
    }
}
 async function featureAd(req,res,next){
        if(!(req.body.AuctionID&&req.body.PackageID))
            res.status(500).send("Invalid Request");
        const  feature=new FeatureAds(req.body.AuctionID,req.body.PackageID);
        try{
            const result=await feature.Insert();
            if(result>0){
                res.json("Sucessfully featured")
            }
        }     
        catch(err){
            res.status(500).send(err.message);
        }
 }
module.exports={
    getfeatureads,featureAd
}