import mysql from 'mysql'

const con = mysql.createConnection({
    host: "database-1-instance-1.chjkbqorexj6.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "BostonKid26",
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to the db")

    con.query('CREATE DATABASE IF NOT EXISTS main')
    con.query('USE main')
    con.query('CREATE TABLE IF NOT EXISTS users(id int(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, first_name varchar(40), last_name varchar(40), gender varchar(10), age int(10), ssn varchar(40), email varchar(50), token varchar(40));',function(error, result, fields) {
        console.log(result);
    });
    con.end();
})

module.exports.con = con



