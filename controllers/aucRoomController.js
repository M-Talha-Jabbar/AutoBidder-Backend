const AuctionRoom=require('../models/AuctionRoomViewModel');
async function auctionRoomData(req,res,next){
    if(!req.query.AuctionID)
    res.status(400).send("Invalid request");
    const room=new AuctionRoom(req.query.AuctionID);
    try{
        await room.Load();
        res.json(room)
    }catch(err){
        res.status(500).json(err.message)
    }
}
module.exports={auctionRoomData};