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
    
    async subscribe(){
        
    }
}
module.exports=Subscription;