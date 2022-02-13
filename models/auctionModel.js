const connectDB = require("../connect.js").connectToDB;
class Auction {
    constructor(auction) {
        if (auction) {
            this.start_date_time = auction.start_date_time
            this.end_date_time = auction.end_date_time
            this.sellerID = auction.sellerID
            this.closing_bid = auction.closing_bid || null      //optional Buy now
            this.status = auction.status
            this.auc_winner = auction.auc_winner || null    //Will be set later      
            this.auc_vehicle = auction.auc_vehicle
        }

    }
    async getall() {
        const query = "Select * from `auctions` Where 1";
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
            console.log(res.length)
            if (res.length > 0)
                return res;
            else
                return "No auctions found";

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }

    }
    async filters(fields, values) {
        let query = "Select * from `auctions` Where " + `${fields[0]}='${values[0]}'`;
        let index = 1;
        for (let index = 1; index < fields.length; index++)
            query += ` and ${fields[index]}='${values[index]}'`
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
            console.log(res.length)
            if (res.length > 0)
                return res;
            else
                return "No auctions found";

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }


    }
    async insert() {
        if (!await this.validateVehicle(this.sellerID, this.auc_vehicle))  //Invalid Car
            throw Error("The selected vehicle is not registered against your cnic");
        if (!await this.validateAucTime(this.start_date_time, this.end_date_time))  //Invalid date
            throw Error("The selected vehicle already registered for auction in that dataeTime");

        const query = "INSERT INTO `auctions`( `start_date_time`, `end_date_time`, `sellerID`,`closing_bid`,`status`,`auc_winner` ,`auc_vehicle`)" + `VALUES ('${this.start_date_time}','${this.end_date_time}',${this.sellerID},${this.closing_bid},'${this.status}',${this.auc_winner},'${this.auc_vehicle}')`;
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
            return res;
        } catch (err) {
            return err;
        } finally {
            dbCon.release();
        }

    }  //end Insert

    async DeleteAuction(id) {
        const query = `Delete from auctions where Id=${id}`;
        let ExeQuery, dbCon;
        try {
            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            } catch (err) {
                console.log("cant Connect");
            }

            const res = await ExeQuery(query);
            console.log(res.affectedRows)
            return res;
        } catch (err) {
            throw err.message;
        }
        finally {
            dbCon.release();
        }

    }
    async validateVehicle(owner, vehicle) {
        const query = `Select * from vehicles where RegNo='${vehicle}' and ownerCNIC=${owner}`
        console.log(query)
        var dbCon, ExeQuery;
        try {

            try {
                const connection = await connectDB();
                dbCon = connection.con;         //release
                ExeQuery = connection.ExeQuery;    
            }
            catch (err) {
                console.log("not connected :", err.message)
            }
            const res = await ExeQuery(query);
            console.log(res.length)
            if (res.length > 0)
                return true;
            else
                return false;

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }

    }
    async IsRegisteredForBidding(aucId,CNIC){
        const query = `SELECT * FROM bidders WHERE AuctionID=${aucId} and UserCnic="${CNIC}"`;
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
            console.log(res.length)
            if (res.length > 0)
                return true;
            else
                return false;

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }
    }
    async validateAucTime(start, end) {
        const query = `Select * from auctions where auc_vehicle='${this.auc_vehicle}' AND (start_date_time BETWEEN'${start}' and '${end}' OR end_date_time BETWEEN'${start}' and '${end}')`
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
            console.log(res.length)
            if (res.length > 0)
                return false;
            else
                return true;

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }

    }
}
module.exports = Auction;