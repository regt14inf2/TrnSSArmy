const {pool} = require('../db/db')

// class UserModel {
    // constructor({email='', password='', id=0}) {
    //     this.email = email;
    //     this.password = password;
    //     this.id = id;
    //     this.createAt = new Date();
    //     this.updateAt = new Date();
    // }

    const registerUser = async(dat) => {
        try {
            const search = await pool.query(
                `SELECT "USERID", "PASSWORD" FROM public."MAS_USER" 
                WHERE "USERID" = '${dat.USERID}'`
            )
            if(search.rowCount !== 0){
                return 'USER ID is exist'
            }
            else{
                let queryString = `INSERT INTO public."MAS_USER"(
                    "USERID", "PASSWORD", "ROLE", "DETP")
                    VALUES ('${dat.USERID}','${dat.PASSWORD}','${dat.ROLE}','${dat.DEPT}')`
                
                const result = await pool.query(queryString);
                return result
            }
        } catch (error) {
            return error
        }
    }

    const findUserByUserName = async(userId) => {
        try {
            let queryString = `SELECT * FROM public."MAS_USER" 
            WHERE "USERID" = '${userId}'`

            const result = await pool.query(queryString);
            return result
        } catch (error) {
            return error
        }
    }

// }

module.exports = {findUserByUserName, registerUser};