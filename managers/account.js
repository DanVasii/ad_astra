const pool = require("./mysql");

function register(user_object){

    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{

                //convert user_objec to array
                let user_data = [];

                for (const value of Object.keys(user_object)){
                    if (value !== "experiences")
                    user_data.push(user_object[value]);
                }

                connection.query("INSERT INTO users (nume, prenume, birth, judet, oras, phone, email, about, parola, highschool, univ_id) values (?)",[user_data], (error, results, fields)=>{
                    if (error){
                        connection.release();
                        reject();
                    }else{
                        const insertedId = results.insertId;
                        //insert experiences now
                        let exp_array = [];
                        for (const experience of user_object.experiences){
                            exp_array.push(
                                [insertedId, experience.name, experience.start, experience.end]
                            );
                        }

                        if (exp_array.length == 0){
                            connection.release();
                            resolve();
                            return ;
                        }

                        connection.query("INSERT INTO experiences (user_id, nume, start, end) values ?", [exp_array], (error, results, fields)=>{
                            connection.release();
                            if(error){
                                console.log(error);
                                reject();
                            }else{
                                resolve();
                            }
                        })
                    }
                })
            }
        })
    })

}

function login(email, pass)
{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{
                console.log(email, pass);
                connection.query("SELECT id from users where email = ? and parola = ?",[email, pass], (err, results, fields)=>{
                    connection.release();
                    if (err){
                        reject();
                    }else{
                        if (results.length == 0){
                            reject();
                        }else{
                            resolve(results[0].id);
                        }
                    }
                })
            }
        })
    })
}

function join_grupa(user_id){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{
                connection.query("UPDATE users set grupa = 1 where id = ?",[user_id],(error, results, fields)=>{
                    connection.release();
                    if (error){
                        reject();
                    }else{
                        resolve();
                    }
                })
            }
        })
    })
}

function get_grupa(user_id){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{
                connection.query("SELECT grupa from users where id = ?", [user_id], (error, results, fields)=>{
                    connection.release();
                    if (error){
                        reject();
                    }else{
                        if (results.length == 0){
                            reject();
                        }else{
                            if (results[0].grupa == 0){
                                reject();
                            }else{
                                resolve();
                            }
                        }
                    }
                })
            }
        })
    })
}

function get_users(ids){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{
                connection.query("SELECT CONCAT(nume, ' ', prenume) as name, CONCAT(judet, ', ', oras) as locatie, about from users where id in (?)",[ids],(error, results, fields)=>{
                    connection.release();
                    if (error){
                        reject();
                    }else{
                        resolve(results);
                    }
                })
            }
        })
    })
}

module.exports = {
    register, login, join_grupa, get_grupa, get_users
}