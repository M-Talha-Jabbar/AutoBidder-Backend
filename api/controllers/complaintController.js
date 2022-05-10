const db_connection = require("../config/db_connect");


const createComplaint = (description, UserCNIC) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'INSERT INTO complaints (description, UserCNIC) VALUES (?, ?)', [description, UserCNIC], (err, res) => {

                if(err){
                    reject(err);
                }

                else{
                    resolve('Complaint registered');
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const user_complaint_create = (req, res) => {
    createComplaint(req.body.description, req.body.UserCNIC)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};




const updateComplaint = (description, complaintId) => new Promise((resolve, reject) => {
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'UPDATE complaints SET description = ? WHERE ID = ?', [description, complaintId], (err, res) => {

                if(err){
                    reject(err);
                }

                else{ // if no rows are updated, still control will come into this block
                    if(res.affectedRows > 0) resolve('Complaint updated');
                    else resolve('There is no such complaint in Db');
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const user_complaint_update = (req, res) => {
    updateComplaint(req.body.description, req.params.complaintId)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};




const deleteComplaint = (complaintId) => new Promise((resolve, reject) => {
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'DELETE FROM complaints WHERE ID = ?', [complaintId], (err, res) => {

                if(err){
                    reject(err);
                }

                else{ // if no rows are deleted, still control will come into this block
                    if(res.affectedRows > 0) resolve('Complaint deleted');
                    else resolve('There is no such complaint in Db');
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const user_complaint_delete = (req, res) => {
    const complaintId = req.params.complaintId;

    deleteComplaint(complaintId)
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
    user_complaint_create, user_complaint_delete, user_complaint_update, user_complaints
};