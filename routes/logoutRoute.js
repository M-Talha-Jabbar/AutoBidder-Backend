const router = require("./loginAuthentication");

router.get("/",(req,res,next)=>{
    
    res.status(200).clearCookie("jwt").send(true)
})
module.exports=router