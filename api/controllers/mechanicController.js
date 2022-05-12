const e = require("cors");
const JWT=require('jsonwebtoken');
const { DATETIME } = require("mysql/lib/protocol/constants/types");
const db_connection = require("../config/db_connect");
const createPDF=require('../generateReport');

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
    if(req.cookies.jwt==undefined)
    {
       return res.status(403).end("You are not authorized")
    }
    const tokenData=JWT.verify(req.cookies.jwt,process.env.JWT_KEY);
    certifiedByMechanic(tokenData.CNIC)
    certifiedByMechanic(req.body.CNIC)
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

const storeReport= async (name,cnic,regNo,totalPoints)=>{
    db_connection.getConnection((err,con)=>{
        if(err){
            throw err;
        }
        else{
            con.query(`INSERT INTO vehicle_reports(name, VehicleRegNo, MechanicCNIC, date_time, total_points) VALUES ('${name}','${regNo}','${cnic}','${new Date().toISOString().slice(0, 19).replace('T', ' ')}',${totalPoints})`,(error,result)=>{
                if(error)
                console.log(error);
                else{
                    return result.affectedRows;
                }
                con.release(err => {
                    if(err) console.log(err);
                });
            })
        }
    })
}
const generate_Report= async(req,res,next)=>{
    try{
        console.log(req.cookies)
      let result=await createPDF(req.body);
      let stored=await storeReport(req.body.carName,"42101-2232504-6",req.body.regNo,100);
      if(stored>0){
          console.log("report saved");
      }
      res.json(result);
      }catch(e){
        res.status(500).send(e.message);
      }
}
async function login(req,res,next){
    db_connection.getConnection((err,connection)=>{
        if(err)
        res.end(err)
        else{
            connection.query(`SELECT * FROM mechanics WHERE CNIC='${req.body.CNIC}' AND password='${req.body.password}'`,(error,result)=>{
                if(error){
                    console.log(error);
                }
                else if(result.length>0){
                    console.log(result.length);
                    const payload={
                        CNIC:result[0].CNIC,
                        name:result[0].full_name,

                    }
                    const jwt=JWT.sign(payload,process.env.JWT_KEY,{expiresIn:"5d"});
                    res.cookie("jwt",jwt,{httpOnly:true,path:'/'});
                    res.json({
                      status:true,
                      message:"success"
                    })
                }
                else{
                    res.status(403).json({
                        status:false,
                        message:"invalid password or cnic"
                      });
                }
            })
        }
    })
}

async function MechanicInfo(req,res,next){
    const tokenData=JWT.verify(req.cookies.jwt,process.env.JWT_KEY);
    db_connection.getConnection((err,connection)=>{
        if(err)
        res.end(err)
        else{
            connection.query(`select full_name,contact_no,location,COUNT(vehicle_reports.name) as certifiedVehicles from mechanics LEFT JOIN vehicle_reports on vehicle_reports.MechanicCNIC=mechanics.CNIC WHERE CNiC="${tokenData.CNIC}";`,(error,result)=>{
                if(error){
                    console.log(error);
                }
                else if(result.length>0){
                    console.log(result.length);
                    res.json(result[0]);
                }
                else
                res.json("no result found")
            })
        }
    })
}

module.exports = {
    mechanic_list,MechanicInfo, mechanic_by_location, mechanic_certified_vehicles,generate_Report,login
};