var mysql = require('mysql');
const util=require('util');
const test={
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT
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
