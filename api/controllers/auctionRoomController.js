const db_connection = require("../config/db_connect");

const closeAuctionRoom = (RoomID, closing_bid, auc_winner, total_bids_placed) => new Promise((resolve, reject) => {
    
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                `UPDATE auctions
                SET closing_bid=?, auc_winner=?, total_bids_placed=?
                WHERE ID=?`, [closing_bid, auc_winner, total_bids_placed, RoomID], (err, res) => {

                if(err) reject(err); 
                else resolve(res);

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const closeAuctionBids = (RoomID, bidderID, lastBid, bidCount) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                `INSERT INTO bidders_bid (last_bid_amount, bid_count, BidderID, AuctionID)
                VALUES (?, ?, ?, ?)`, [lastBid, bidCount, bidderID, RoomID], (err, res) => {

                if(err) reject(err); 
                else resolve(res);

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

module.exports = {
    closeAuctionRoom, closeAuctionBids
};