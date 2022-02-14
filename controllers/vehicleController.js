const db_connection = require("../config/db_connect");

const getReport = (RegNo) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'SELECT name, VehicleRegNo, date_time, total_points FROM vehicle_reports WHERE VehicleRegNo = ?', [RegNo], (err, res) => {

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

const vehicle_report = (req, res) => {
    getReport(req.params.RegNo)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};




const createReport = (RegNo, MechanicCNIC, total_points) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'INSERT INTO vehicle_reports (name, VehicleRegNo, MechanicCNIC, total_points) VALUES (?,?,?,?)  ', 
                [`inspection_${RegNo}`, RegNo, MechanicCNIC, total_points], (err, res) => {

                if(err){
                    reject(err);
                }

                else{
                    resolve('Report created');
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
});

const vehicle_report_create = (req, res) => {
    createReport(req.body.RegNo, req.body.MechanicCNIC, req.body.total_points)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};


// function getVehicle(regno){
//     db_connection.getConnection((err, connection) => {

//         if(err) console.log(err);

//         else{
//             console.log('Connection got: ', connection.threadId);

//             connection.query(
//                 `SELECT * FROM vehicles where RegNo=${regno};`, (err, result) => {

//                 if(err){
//                     throw err;
//                 }

//                 else{
//                     console.log(result)
//                     return result
//                 }

//                 connection.release(err => {
//                     if(err) console.log(err);
//                 });
//             });
//         }
//     });
// }


module.exports = {
    vehicle_report, vehicle_report_create
};