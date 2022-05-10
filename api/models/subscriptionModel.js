const connectDB = require("../connect.js").connectToDB;
class Subscription{
    constructor(TypeID = null){
        this.TypeID=TypeID;
        this.package=null;
        this.RemainingAuction = TypeID && (this.TypeID === 1) ? 5 : 25;
        this.TransactionID = TypeID && (this.TypeID === 1) ? 1 : 2;
    }

    async getSubscriptions(UserCNIC){
        const query=`SELECT mt.type, mr.* FROM membership_registrations as mr join membership_types as mt WHERE mr.TypeID=mt.Id AND mr.UserCNIC='${UserCNIC}';`
        var dbCon, ExeQuery;
        try {

            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err);
            }
            const res = await ExeQuery(query);
            console.log(res.length);
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

    async alreadyRegister(UserCNIC){
        const query = `SELECT * FROM membership_registrations WHERE UserCNIC = '${UserCNIC}'`;

        var dbCon, ExeQuery;
        try{
            try{
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch(err){
                console.log("not connected :", err);
            }

            const res = await ExeQuery(query);
            console.log(res.length);
            if (res.length === 1)
                return true;
            else
                return false;
        }
        catch(err){
            console.log(err);
        }
        finally{
            dbCon.release();
        }
    }
    
    async subscribe(UserCNIC){
        const query = `INSERT INTO membership_registrations (TypeID, UserCNIC, TransactionID, RemainingAuction) VALUES(${this.TypeID}, '${UserCNIC}', ${this.TransactionID}, ${this.RemainingAuction})`
        
        var dbCon, ExeQuery;
        try{
            try{
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch(err){
                console.log("not connected :", err);
            }

            const res = await ExeQuery(query);
            console.log(res.length);
            if (res.length > 0)
                return res;
            else
                return false;
        }
        catch(err){
            console.log(err);
        }
        finally{
            dbCon.release();
        }
    }
}
module.exports=Subscription;