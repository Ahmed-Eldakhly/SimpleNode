require("../boot/requires");

const mysql = require('mysql')

const APIs = [
    ['Login' , 'Post'],
    ['Users' , 'Get'],
    ['Users' , 'Patch'],
    ['Users' , 'Post'],
    ['Users' , 'Delete'],
    ['Permission' , 'Get'],
    ['Permission' , 'Patch'],
    ['Permission' , 'Post'],
    ['Permission' , 'Delete']
]

const ADMIN_DATA = [
    ['admin' , 'admin' , '123456'],
]

const ADMIN_PERMISSION_DATA = [
    [1 , 1],
    [1 , 2],
    [1 , 3],
    [1 , 4],
    [1 , 5],
    [1 , 6],
    [1 , 7],
    [1 , 8],
    [1 , 9]
]

var mysql_connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });
  
  new Promise ((resolve , reject) => {
      // try to connect with the MySQL server
    mysql_connection.connect(function(err) {
        if (err) throw err;
        console.log("mysql Connected!");
        // Check if the DB is exist
        mysql_connection.query("SHOW DATABASES LIKE '" + process.env.DATABASE_NAME + "'", function (err, result) {
            if (err) throw err;
            if(result.length === 0)
                // create the database
                mysql_connection.query("CREATE DATABASE " + process.env.DATABASE_NAME, function (err, result) {
                    if (err) throw err;
                    console.log("aiactive Database was created");
                });
          });
          // connect to the database
          mysql_connection.query("USE aiactiveDB", function (err, result) {
            if (err) throw err;
            console.log("AIactive database is used now");
          });
          // check if the apis_table table exists
          mysql_connection.query("SHOW TABLES LIKE 'apis_table'", function (err, result) {
            if (err) throw err;
            if(result.length === 0){
                // create apis_table table
                mysql_connection.query("CREATE TABLE apis_table(API_ID INT AUTO_INCREMENT , API_Name VARCHAR(255) , API_Method VARCHAR(20) , PRIMARY KEY(API_ID))", function (err, result) {
                    if (err) throw err;
                    console.log("API Table was created successfully");
                });
                // insert the data of this table (this table contains only 3 colums and 9 rows)
                mysql_connection.query("INSERT INTO apis_table (API_Name , API_Method) VALUES ?" , [APIs], function (err, result) {
                    if (err) throw err;
                    console.log("API Table has data");
                });
            }
        });
        // check if the users table exists
        mysql_connection.query("SHOW TABLES LIKE 'users'", function (err, result) {
            if (err) throw err;
            if(result.length === 0)
                //create users table
                mysql_connection.query("CREATE TABLE users(User_ID INT AUTO_INCREMENT UNIQUE NOT NULL, First_Name VARCHAR(50) , Last_Name VARCHAR(50) , Password VARCHAR(50) , Email VARCHAR(50) , PRIMARY KEY (First_Name , Last_Name))", function (err, result) {
                    if (err) throw err;
                    console.log("user Table was created successfully");
                    // insert the admin data
                    mysql_connection.query("INSERT INTO users (First_Name , Last_Name , Password) VALUES ?" , [ADMIN_DATA], function (err, result) {
                        if (err) throw err;
                        console.log("user has data");
                    });
                });
        });
        // check if the permissions table exists
        mysql_connection.query("SHOW TABLES LIKE 'permissions'", function (err, result) {
            if (err) throw err;
            if(result.length === 0)
                //create permissions table
                mysql_connection.query("CREATE TABLE permissions(User_ID INT, API_ID INT, PRIMARY KEY(User_ID , API_ID) , FOREIGN KEY (User_ID) REFERENCES users(User_ID) , FOREIGN KEY (API_ID) REFERENCES apis_table(API_ID))", function (err, result) {
                    if (err) throw err;
                    console.log("permissions Table was created successfully");
                    // insert the prevelige of admin user
                    mysql_connection.query("INSERT INTO permissions (User_ID , API_ID) VALUES ?" , [ADMIN_PERMISSION_DATA], function (err, result) {
                        if (err) throw err;
                        console.log("permissions has data");
                    });
                });
        });
    })
  }).then(()=>{
    //mysql_connection.end();
  })

module.exports = mysql_connection;