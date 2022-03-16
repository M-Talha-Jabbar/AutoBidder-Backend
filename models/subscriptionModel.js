const connectDB = require("../connect.js").connectToDB;
class Subscription{
    constructor(){
        this.package=null;
        this.RemainingAuction=null;
        this.TransactionID=null;
        this.TypeID=null;
    }
    async getSubscriptions(UserCNIC){
        const query=`SELECT mt.type,mr.* FROM membership_registrations as mr join membership_types as mt WHERE mr.TypeID=mt.Id AND UserCNIC='${UserCNIC}';`
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
            console.log(res.length)
            if (res.length > 0)
                return res;
            else
                return false;

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }

    }
    async subscribe(UserCNIC,AuctionID,RegID){
        const query=`UPDATE membership_registrations SET RemainingAuction=(SELECT RemainingAuction FROM membership_registrations WHERE RegID=${RegID})-1 WHERE RegID=${RegID};`
        const query2=`INSERT INTO bidders(UserCNIC, AuctionID) VALUES ('${UserCNIC}',${AuctionID})`;
        const query3=`SELECT ID as BiddingID FROM bidders WHERE UserCNIC='${UserCNIC}' and AuctionID=${AuctionID}`
        console.log(query3)
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
            let res = await ExeQuery(query);
            console.log(res.affectedRows)  //Subscription  updated
            if (res.affectedRows > 0)
                {
                    res=await ExeQuery(query2);
                    if(res.affectedRows>0){
                        res=await ExeQuery(query3); //get bidding id
                        return res[0];
                    }
                }
            else
                return false;

        }
         catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }
    }
}
module.exports=Subscription;