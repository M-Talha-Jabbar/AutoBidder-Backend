const db_connection = require("../config/db_connect");


const getMembershipTypes = () => new Promise((resolve, reject) => {
    
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'SELECT * FROM membership_types', (err, res) => {

                if(err){
                    reject(err);
                }

                else{
                    resolve(res);
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const bidder_membership_types = (req, res) => {
    getMembershipTypes()
        .then(result => res.json(result))
        .catch(err => res.json(err));
};



/*
const createSubscription = () => new Promise((resolve, reject) => {
    
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                '', [], (err, res) => {

                if(err){
                    reject(err);
                }

                else{
                    resolve(res);
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const bidder_membership_subscription = (req, res) => {
    createSubscription()
        .then(result => res.json(result))
        .catch(err => res.json(err));
};
*/



const getHistory = (UserCNIC) => new Promise((resolve, reject) => {
    
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                `select 
                    b.UserCNIC, a.start_date_time, a.end_date_time, a.auc_vehicle, a.auc_winner, a.status, bb.last_bid_amount, bb.bid_count 
                from bidders b 
                inner join bidders_bid bb on b.ID = bb.BidderID and b.UserCNIC = ?
                inner join auctions a on b.AuctionID = a.ID`, [UserCNIC], (err, res) => {

                if(err){
                    reject(err);
                }

                else{
                    resolve(res);
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const bidder_history = (req, res) => {
    getHistory(req.body.UserCNIC)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};


module.exports = {
    bidder_membership_types, /*bidder_membership_subscription,*/ bidder_history
};