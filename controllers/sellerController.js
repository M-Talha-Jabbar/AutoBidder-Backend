const db_connection = require("../config/db_connect");

const getHistory = (sellerCNIC) => new Promise((resolve, reject) => {
    
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'Select a.* FROM sellers s INNER JOIN sellers_history h ON s.Id = h.sellerID and UserCNIC = ? INNER JOIN auctions a on h.AuctionID = a.ID', 
                [sellerCNIC], (err, res) => {

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

const seller_history = (req, res) => {
    getHistory(req.body.sellerCNIC)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};


const getSellerInfo = (AuctionID) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'Select u.full_name,u.contact_no,u.email FROM auctions a INNER JOIN sellers s ON a.sellerID = s.ID and a.ID = ? INNER JOIN users u ON s.UserCNIC = u.CNIC',
                 [AuctionID], (err, res) => {

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

const seller_info = (req, res) => {
    getSellerInfo(req.params.AuctionID)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

module.exports = {
    seller_history, seller_info,getSellerInfo
};