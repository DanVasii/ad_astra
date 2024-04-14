const pool = require("./mysql");

function get_all()
{
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{
                connection.query("SELECT departments.id,departments.name as dep_name, universities.name as univ_name from departments join universities on universities.id = departments.univ_id",(error, results, fields)=>{
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

function add_univ(data){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if (err){
                reject();
            }else{
                console.log(data);
                connection.query("INSERT INTO universities (name, county, city) values (?, ?, ?)",[data.univ_name, data.judet, data.oras], (error, results, fields)=>{
                    if (error){
                        console.log(error);
                        connection.release();
                        reject();
                    }else{
                        let insertedId = results.insertId;

                        let specializari = [];
                        data.specializari.forEach((spec)=>{
                            specializari.push([insertedId, spec]);
                        })
                        //add specialities 
                        connection.query("INSERT INTO departments (univ_id, name) values ?", [specializari], (error, results, fields)=>{
                            if (error){
                                connection.release();
                                reject();
                            }else{
                                let resurse = [];
                                data.resurse.forEach((res)=>{
                                    resurse.push([insertedId, res[0], res[1]]);
                                })

                                connection.query("INSERT INTO resurse (univ_id, name, price) VALUES ? ", [resurse], (error, results, fields)=>{
                                    connection.release();
                                    if (error){
                                        reject();
                                    }else{
                                        resolve();
                                    }
                                })
                                resolve();
                            }
                        })
                    }
                })
            }
        })
    })
}

module.exports = {
    get_all, add_univ
}