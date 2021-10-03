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
    host: "localhost",
    user: "root",
    password: "mysqlddakhly"
  });
  
  mysql_connection.connect(function(err) {
    if (err) throw err;
    console.log("mysql Connected!");
    mysql_connection.query("SHOW DATABASES LIKE 'aiactiveDB'", function (err, result) {
        if (err) throw err;
        //console.log(result.length);
        if(result.length === 0)
            mysql_connection.query("CREATE DATABASE AIactiveDB", function (err, result) {
                if (err) throw err;
                console.log("aiactive Database was created");
            });
      });
      mysql_connection.query("USE aiactiveDB", function (err, result) {
        if (err) throw err;
        console.log("AIactive database is used now");
      });
      mysql_connection.query("SHOW TABLES LIKE 'apis_table'", function (err, result) {
        if (err) throw err;
        if(result.length === 1)
            mysql_connection.query("DROP TABLE apis_table", function (err, result) {
                if (err) throw err;
                console.log("you can create API table now");
            });
              //create API table
        mysql_connection.query("CREATE TABLE apis_table(API_ID INT AUTO_INCREMENT , API_Name VARCHAR(255) , API_Method VARCHAR(20) , PRIMARY KEY(API_ID))", function (err, result) {
            if (err) throw err;
            console.log("API Table was created successfully");
        });
        mysql_connection.query("INSERT INTO apis_table (API_Name , API_Method) VALUES ?" , [APIs], function (err, result) {
            if (err) throw err;
            console.log("API Table has data");
        });
    });
    mysql_connection.query("SHOW TABLES LIKE 'users'", function (err, result) {
        if (err) throw err;
        if(result.length === 0)
            //create users table
            mysql_connection.query("CREATE TABLE users(User_ID INT AUTO_INCREMENT UNIQUE NOT NULL, First_Name VARCHAR(50) , Last_Name VARCHAR(50) , Password VARCHAR(50) , Email VARCHAR(50) , PRIMARY KEY (First_Name , Last_Name))", function (err, result) {
                if (err) throw err;
                console.log("user Table was created successfully");
                mysql_connection.query("INSERT INTO users (First_Name , Last_Name , Password) VALUES ?" , [ADMIN_DATA], function (err, result) {
                    if (err) throw err;
                    console.log("user has data");
                });
            });
    });

    mysql_connection.query("SHOW TABLES LIKE 'permissions'", function (err, result) {
        if (err) throw err;
        if(result.length === 0)
            //create users table
            mysql_connection.query("CREATE TABLE permissions(User_ID INT, API_ID INT, PRIMARY KEY(User_ID , API_ID))", function (err, result) {
                if (err) throw err;
                console.log("permissions Table was created successfully");
                mysql_connection.query("INSERT INTO permissions (User_ID , API_ID) VALUES ?" , [ADMIN_PERMISSION_DATA], function (err, result) {
                    if (err) throw err;
                    console.log("permissions has data");
                });
            });
            //mysql_connection.end();
    });
});

module.exports = mysql_connection;