// const dbCon=require('../connect.js').con;
const connectDB = require("../connect.js").connectToDB;
// const ExeQuery=require('../connect.js').ExeQuery;

class User {
    constructor(user) {
        if(user){
        this.CNIC = user.CNIC
        this.full_name = user.full_name;
        this.email = user.email;
        this.password = user.password;
        this.contact_no = user.contact_no
        this.location = user.location
        this.isSeller = user.isSeller;
        this.isBuyer = user.isBuyer;}
    }
    async isCnicExists(cnic) {
        const query = "Select * from `users` Where CNIC=" + `'${cnic}'`;
        console.log(query);
        var dbCon, ExeQuery;
        try {

            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            const res = await ExeQuery(query);
            console.log(res.length)
            if (res.length > 0)
                return true
            else
                return false;

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }

    }
    async isEmailExists(email) {
        const query = "Select * from `users` Where email=" + `'${email}'`;
        console.log(query);
        var dbCon, ExeQuery;
        try {
            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            const res = await ExeQuery(query);
            console.log(res.length)
            if (res.length > 0)
                return true
            else
                return false;

        } catch (err) {
            console.log(err);
        }
        finally {
            dbCon.release();
        }

    }
    async updateStaus(CNIC,field,value){  //isSeller // Buyer
        let query = 'Update `users` SET  `'+field+'`='+value+' where `CNIC`='+`'${CNIC}'`;
        console.log(query)
        var dbCon, ExeQuery;
        try {
            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            let res = await ExeQuery(query);
            if(field==='isSeller'){
            query=`INSERT INTO sellers(UserCNIC) VALUES ('${CNIC}')`;
            res=await ExeQuery(query);
            }
            return res.affectedRows;


            } catch (err) {
            throw err;
            }finally {
            dbCon.release();
        }

    }  //end Update
    
    async insert() {
        const query = "INSERT INTO `users`(`CNIC`, `full_name`,`email`,`password`, `contact_no`,`location`, `isSeller`,`isBuyer`)" + `VALUES ('${this.CNIC}','${this.full_name}','${this.email}','${this.password}','${this.contact_no}','${this.location}',${this.isSeller},${this.isBuyer})`;
        const query2 = `INSERT INTO sellers (UserCNIC) VALUES ('${this.CNIC}')`;
        
        console.log(query, query2);
        var dbCon, ExeQuery;
        try {
            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            const res = await ExeQuery(query);
            if(this.isSeller === 1){
                const res2 = await ExeQuery(query2);
            }

        } catch (err) {
            return err;
        } finally {
            dbCon.release();
        }

    }  

    async checkPassword(email,password){
        const query=`SELECT * FROM users WHERE email='${email}' and password='${password}'`;
        console.log(query);
        var dbCon, ExeQuery;
        try {
            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            const res = await ExeQuery(query);
            return res[0];
        } catch (err) {
            return err;
        } finally {
            dbCon.release();
        }
    }
    async getSellerId(email)
    {
        const query = `SELECT id from sellers WHERE UserCNIC=(SELECT CNIC FROM users WHERE email='${email}');`;
        console.log(query);
        var dbCon, ExeQuery;
        try {

            try {
                const connection = await connectDB();
                dbCon = connection.con;
                ExeQuery = connection.ExeQuery;
            }
            catch (err) {
                console.log("not connected :", err)
            }
            const res = await ExeQuery(query);
            console.log(res.length)
            if (res.length > 0)
                return res[0].id;
            else
                return false;

        } catch (err) {
            throw err;
        }
        finally {
            dbCon.release();
        }
    }
}
module.exports = User;