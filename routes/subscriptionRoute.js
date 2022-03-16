const router=require("express").Router();
const subController=require("../controllers/subscriptionController");
router.post("/getRegisteredPackages",subController.getSubs);
router.post("/subscribe",subController.subscribe);
module.exports=router;