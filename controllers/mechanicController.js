const db_connection = require("../config/db_connect");


const getMechanics = () => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'SELECT full_name, contact_no, location, rating FROM mechanics', (err, res) => {

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

const mechanic_list = (req, res) => {
    getMechanics()
        .then(result => res.json(result))
        .catch(err => res.json(err));
};




const getMechanicByLocation = (location) => new Promise((resolve, reject) => {
    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'SELECT full_name, contact_no, location, rating FROM mechanics WHERE location LIKE ? ', [`%${location}%`], (err, res) => {

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

const mechanic_by_location = (req, res) => {
    getMechanicByLocation(req.params.location)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};




const certifiedByMechanic = (CNIC) => new Promise((resolve, reject) => {

    db_connection.getConnection((err, connection) => {

        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                'SELECT name, VehicleRegNo, date_time FROM vehicle_reports WHERE MechanicCNIC = ?', [CNIC], (err, res) => {

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

const mechanic_certified_vehicles = (req, res) => {
    certifiedByMechanic(req.body.CNIC)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};


module.exports = {
    mechanic_list, mechanic_by_location, mechanic_certified_vehicles
};