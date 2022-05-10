const controller=require('../controllers/featureAdsController');
const router=require('express').Router();
router.get('/ads_list',controller.getfeatureads);
router.post('/featureAd',controller.featureAd)
module.exports=router;