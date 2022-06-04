const db_connection = require("../config/db_connect");


const createComplaint = (name, complaint, UserCNIC, auctionID) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'INSERT INTO complaints (name, description, UserCNIC, AuctionID) VALUES (?, ?, ?, ?)', [name, complaint, UserCNIC, auctionID], (err, res) => {

                if(err){
                    reject(err);
                }

                else{
                    resolve('Complaint registered!');
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const user_complaint_create = (req, res) => {
    createComplaint(req.body.name, req.body.complaint, req.body.UserCNIC, req.body.auctionID)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};



const getComplaints = (UserCNIC) => new Promise((resolve, reject) => {
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'SELECT * FROM complaints WHERE UserCNIC = ?', [UserCNIC], (err, res) => {

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

const user_complaints = (req, res) => {
    getComplaints(req.body.UserCNIC)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};


module.exports = {
    user_complaint_create, user_complaints
};