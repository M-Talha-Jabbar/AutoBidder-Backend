var mysql = require('mysql');
const util=require('util');
const test={
    host: "localhost",
    database:"car_tijarat",
    user: "root",
    password: ""  
}

const pool=mysql.createPool(test);
const getConnection=util.promisify(pool.getConnection).bind(pool);
async function connectToDB(){
  try{ 
  var con = await getConnection();
  var ExeQuery=util.promisify(con.query).bind(con);      
   
  console.log("Connected to DB")
  }catch(err){
   throw err
  }
   return {con,ExeQuery}
}

module.exports={connectToDB};
