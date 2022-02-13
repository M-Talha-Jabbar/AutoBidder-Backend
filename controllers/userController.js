const UserModel = require('../models/userModel.js')
async function signup(req, res, next) {
    const userReq = req.body;
    if (!userReq)
        return res.status(400).json("Invalid Request");
    const user = new UserModel(userReq);
    if (await user.isCnicExists(user.CNIC))
        return res.status(400).json("The CNIC you entered is already registered ");
    if (await user.isEmailExists(user.email))
        return res.status(400).json("The email you entered is already registered ");
    try {
        const result = await user.insert();
        return res.json("Successfully registered");
    } catch (e) {
        return res.send(e);
    }
}
async function registerAsBuyer(req,res,next){
    const user= new UserModel();
    const CNIC=req.body.CNIC;
     if(!CNIC)
     res.status(400).json("Invalid request");
    try{
       await user.updateStaus(CNIC,"isBuyer",1);
       res.status(200).json("Successfully registered as Buyer");
    }catch(err){
        res.status(400).json(err.message);
    }
}
async function registerAsSeller(req,res,next){
    const user= new UserModel();
    const CNIC=req.body.CNIC;
     if(!CNIC)
     res.status(400).json("Invalid request");
     try{
        await user.updateStaus(CNIC,"isSeller",1);
        res.status(200).json("Successfully registered as seller");
     }catch(err){
         res.status(400).json(err.message);
     }
}
module.exports = { signup,registerAsBuyer,registerAsSeller };