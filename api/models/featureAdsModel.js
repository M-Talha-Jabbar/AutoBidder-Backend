const utils=require('../utils.js');
const connectDB = require("../connect.js").connectToDB;
class FeatureAds{
    constructor(AucId,pckgID){
        this.AuctionID=AucId||null;
        this.PackageID=pckgID||null;

    }
    async Insert(){
          //check Payment Later
          const duration=await this.checkpackage(this.PackageID);
          const expiry=utils.getDate(duration);   // depending on package
          const query = "INSERT INTO `featured_ads`(`PackageID`, `AuctionID`, `expiry`)" + `VALUES ('${this.AuctionID}','${this.PackageID}','${expiry}')`;
           console.log(query)
          var dbCon, ExeQuery;
          try {
              try {
                  const connection = await connectDB();
                  dbCon = connection.con;
                  ExeQuery = connection.ExeQuery;
              }
              catch (err) {
                  console.log("not connected :", err)
              }
              const res = await ExeQuery(query);
              return res.affectedRows;
          } catch (err) {
              return err;
          } finally {
              dbCon.release();
          }
  
    }
    async getAds(){
        const query="Select *from featured_ads where 1";
        let ExeQuery,dbCon;
        try{
            try{
                const con=await connectDB();
                ExeQuery=con.ExeQuery;
                dbCon=con.con;
            }
            catch(err){
              res.status(500).json("Couldnt connect to db");
            }
            const res=await ExeQuery(query);
            return res;
        }
        catch(err){
            throw err;
        }
    }
    async checkpackage(id)
    {
        const query = "Select no_of_days as days from `ad_boosting` Where ID=" + `'${id}'`;
        console.log(query);
        var dbCon, ExeQuery;
        try {
            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            const res = await ExeQuery(query);
            if (res.length > 0)
                return res[0].days;
            else
                return false;  //no package found

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }
    }
    }
module.exports=FeatureAds;