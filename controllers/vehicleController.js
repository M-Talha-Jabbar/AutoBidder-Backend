const db_connection = require("../config/db_connect");
const multer=require("multer");
const e = require("express");
const { NULL, TIMESTAMP } = require("mysql/lib/protocol/constants/types");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/cars');
      },
    filename: function (req, file, cb) {
        if(file.mimetype!="image/jpeg")
        throw("Invalid image type")
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('Image');
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


function registerCar(req,res,next){
    if(!req.file)
    throw("no image send")
    let rawpath=req.file.path.split("\\")
    rawpath=rawpath.filter((item,i)=>i!=0)
    let imagePath=''
    console.log(rawpath," here");
    rawpath.forEach(element => {
        imagePath+='/'+element
    });
    
    db_connection.getConnection((err, connection) => {
        const car=req.body;
        const query="INSERT INTO `vehicles`(`RegNo`, `name`, `manufacturer`, `modelNo`, `no_of_seats`, `body_type`, `km_driven`, `engine_type`, `fuel_type`, `IsLicenseVerified`,`description`, `ownerCNIC`, `Image`)" +`VALUES ('${car.RegNo}','${car.name}','${car.manufacturer}',${car.modelNo},${car.no_of_seats},'${car.body_type}',${car.km_driven},'${car.engine_type}','${car.fuel_type}',${car.IsLicenseVerified},'${car.description}','${car.ownerCNIC}','${imagePath}')`
        if(err) console.log(err);

        else{
            console.log('Connection got: ', connection.threadId);

            connection.query(
                query, (err, result) => {

                if(err){
                    throw err;
                }

                else{
                    console.log(result)
                     res.status(200).json("saved")
                }

                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
}


function getRegisteredCars(req,res,next){
    db_connection.getConnection((err, connection) => {
        const query=`Select * from vehicles where ownerCNIC='${req.body.CNIC}'`
        if(err) console.log(err);
        else{
            console.log('Connection got: ', connection.threadId);
            connection.query(
                query, (err, result) => {
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json(result);
                }
                connection.release(err => {
                    if(err) console.log(err);
                });
            });
        }
    });
}
module.exports = {
    vehicle_report, vehicle_report_create,registerCar,uploadImg,getRegisteredCars
};