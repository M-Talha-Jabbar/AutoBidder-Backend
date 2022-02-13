const connectDB = require("../connect.js").connectToDB;
class AuctionRoom {
    constructor(id) {
        this.bidders = null;     //Count
        this.closingBid = null;     //closing amount
        this.Seller = null;    // sellerOBject
        this.vehicle = null;  //vehicle object
        this.auctionID = id;
    }
    async Load() {
        let query=[]
        query.push(`SELECT COUNT(*)as count FROM bidders WHERE AuctionID=${this.auctionID}`);
        query.push(`SELECT last_bid_amount as amount from bidders_bid WHERE ID=(SELECT closing_bid from auctions WHERE ID=${this.auctionID})`);
        query.push(`SELECT users.full_name,users.location FROM users JOIN sellers ON (sellers.UserCNIC=users.CNIC) WHERE sellers.Id=(SELECT sellerID from auctions WHERE ID=${this.auctionID})`)
        query.push(`SELECT name,manufacturer,modelNo,no_of_seats,body_type,engine_type,description from vehicles where RegNo=(SELECT auc_vehicle from auctions WHERE ID=${this.auctionID})`);

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
            let res = await ExeQuery(query[0]);
            this.bidders=res[0];
            res = await ExeQuery(query[1]);
             console.log(query[1])
            this.closingBid=res[0];
            res = await ExeQuery(query[2]);
            this.Seller=res[0];
            res = await ExeQuery(query[3]);
            this.vehicle=res[0];

                dbCon.release();

        } catch (err) {
            console.log(err);
        }
      

    }
}
module.exports=AuctionRoom;