const User = require("../models/User");
const mysql_connection = require('../../../boot/dbConnection')
// const bcrypt = require('bcrypt');
// const userPresenter = require("../presenter/userPresenter");
const ResponseCode = require("../../../response-codes")
const ResponseMessage = require("../../../response-messages")

async function index(request, response, next) {
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 2";
    console.log(sql);
    // check on the permission of the use on this endpoint
    mysql_connection.query(sql, function (err, result){
        if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
        console.log(result)
        if (result.length === 0)
        {
            console.log("length is 0")
            next(ResponseCode.PERMISSION_ERROR);
        }
        else if (result.length === 1)
        {
            // retrive all users data
            let sql2 = "SELECT * FROM users";
            console.log(sql2);
            mysql_connection.query(sql2, function (err, result){
                if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
                console.log("no error in sql2")
                console.log(result)
                response.status(ResponseCode.SUCCESS).json(result);
                //mysql_connection.end();
            });     
        }
    });
}

async function show(request, response, next) {
    console.log(request.params.id)
    const id = request.params.id;
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 2";
    console.log(sql);
    // check on the permission of the use on this endpoint
    mysql_connection.query(sql, function (err, result1){
        if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
        console.log(result1)
        if (result1.length === 0)
        {
            console.log("length is 0")
            next(ResponseCode.PERMISSION_ERROR);
        }
        else if (result1.length === 1)
        {
            let sql2 = "SELECT * FROM users WHERE User_ID = " + id;
            console.log(sql2);
            // retrive data of one user
            mysql_connection.query(sql2, function (err, result2){
                if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
                console.log("no error in sql2")
                console.log(result2)
                response.status(ResponseCode.SUCCESS).json(result2);
            });     
        }
    });
}


function store(request, response, next) {
    // check on the insert data is complete and the email is valid
    User.checkOnTheUserData(request, response, next);
    const {
        First_Name,
        Last_Name,
        Password,
        Email,
    } = request.body;
    const NEW_USER_DATA = [
        [First_Name , Last_Name , Password , Email]
    ]
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 4";
    console.log(sql);
    // check on the permission of the use on this endpoint
    mysql_connection.query(sql, function (err, result1){
        if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
        console.log(result1)
        if (result1.length === 0)
        {
            console.log("length is 0")
            next(ResponseCode.PERMISSION_ERROR);
        }
        else if (result1.length === 1)
        {
            let sql2 = "INSERT INTO users (First_Name , Last_Name , Password , Email) VALUES ?" ;
            console.log(sql2);
            // add new user 
            mysql_connection.query(sql2, [NEW_USER_DATA], function (err, result) {
                if (err) {
                    next(ResponseCode.USER_EXIST_ERROR);
                    console.log("this user already exist");
                }else
                    response.status(ResponseCode.SUCCESS).send("The new user was added successfully.");
            });    
        }
    });
}

function update(request, response, next) {
    // check on the insert data is complete and the email is valid
    User.checkOnTheUserData(request, response, next);
    console.log(request.params.id)
    const id = request.params.id;
    const {
        First_Name,
        Last_Name,
        Password,
        Email,
    } = request.body;
    const EDIT_USER_DATA = [
        [First_Name] , [Last_Name] , [Password] , [Email] , [id]
    ]
    console.log(EDIT_USER_DATA);
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 3";
    console.log(sql);
    // check on the permission of the use on this endpoint
    mysql_connection.query(sql, function (err, result1){
        if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
        console.log(result1)
        if (result1.length === 0)
        {
            console.log("length is 0")
            next(ResponseCode.PERMISSION_ERROR);
        }
        else if (result1.length === 1)
        {
            let sql2 = "UPDATE users SET First_Name = ? , Last_Name = ? , Password = ? , Email = ? WHERE User_ID = ?";
            console.log(sql2);
            // edit existing user
            mysql_connection.query(sql2, EDIT_USER_DATA , function (err, result) {
                if (err) {
                    next(ResponseCode.PERMISSION_ERROR);
                }else {
                    console.log(result.changedRows);
                    console.log(result);
                    if(result.changedRows === 0) {
                        next(ResponseCode.CAN_NOT_UPDATE_USER_ERROR);
                        console.log("This user doesn't exist or the data is the same.");
                    } else
                        response.status(ResponseCode.SUCCESS).send("The user informations was updated.");
                }
            });    
        }
    });
}



function destroy(request, response, next) {
    console.log(request.params.id)
    const id = request.params.id;
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 5";
    console.log(sql);
    // check on the permission of the use on this endpoint
    mysql_connection.query(sql, function (err, result1){
        if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
        console.log(result1)
        if (result1.length === 0)
        {
            console.log("length is 0")
            next(ResponseCode.PERMISSION_ERROR);
        }
        else if (result1.length === 1)
        {
            let sql2 = "DELETE FROM users WHERE User_ID = " + id;
            console.log(sql2);
            // delete existing user
            mysql_connection.query(sql2, function (err, result2){
                if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
                console.log("no error in sql2")
                console.log(result2)
                if(result2.affectedRows === 0){
                    console.log("No user with this ID");
                    next(ResponseCode.NO_USER_WITH_ID_ERROR);
                } else
                    response.status(ResponseCode.SUCCESS).send("This user was deleted successfully");
            });     
        }
    });
}



module.exports = {
    index,
    show,
    store,
    update,
    destroy
}