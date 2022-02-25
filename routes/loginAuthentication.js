const router=require('express').Router();
const JWT=require('jsonwebtoken');
const res = require('express/lib/response');
const UserModel = require('../models/userModel.js');
const e = require('express');
router.post('/seller',async(req,res,next)=>{
 if(req.body.email&&req.body.password){
     const email=req.body.email;
     const password=req.body.password;
    const user=new UserModel();
    if(await user.isEmailExists(email))
    { 
        try{
        const User=await user.checkPassword(email,password)
        if(User){
            const token=JWT.sign({email:email,password:password},process.env.JWT_KEY,{expiresIn:"10s"})
            res.cookie("jwt",token,{httpOnly:true,path:'/'})
            res.header("withCredentials", true);
            res.status(200).json({
                cnic:User.CNIC,
                name:User.full_name,
                status:true,
                token:token
            })
        }
        else
        res.status(200).json({status:false,err:"password"})
    }
        catch(e){
            res.status(500).end(e.message);
        }
    }
    else
    res.status(200).json({status:false,err:"email"})
    }
    else{
        console.log(req.body)
        res.status(400).end("Invalid Request")
    }
})
router.get('/seller/check',(req,res)=>{    //for debug
    console.log("token ",req.cookies.jwt);
    const r=JWT.verify(req.cookies.jwt,process.env.JWT_KEY)
    res.send(r);
})
module.exports=router;