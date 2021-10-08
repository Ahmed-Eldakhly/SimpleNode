const Permission = require("../models/Permission")
const ResponseCode = require("../../../response-codes")
const PermissionPresenter = require("../presenter/PermissionPresenter")
const mysql_connection = require('../../../boot/dbConnection')

async function index(request, response,next) {

    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 6";
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
            let sql2 = "SELECT * FROM permissions";
            console.log(sql2);
            // retrieve all permissions
            mysql_connection.query(sql2, function (err, result){
                if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
                console.log("no error in sql2")
                console.log(result)
                // map permission numbers to permission names
                let enhancedResults = PermissionPresenter.presentPermission(result);
                console.log(enhancedResults)
                response.status(ResponseCode.SUCCESS).json(enhancedResults);
                //mysql_connection.end();
            });     
        }
    });
}

async function show(request, response, next) {
    console.log(request.params.id)
    const id = request.params.id;
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 6";
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
            let sql2 = "SELECT * FROM permissions WHERE User_ID = " + id;
            console.log(sql2);
            mysql_connection.query(sql2, function (err, result2){
                if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
                console.log("no error in sql2")
                console.log(result2)
                // map permission numbers to permission names
                let enhancedResults = PermissionPresenter.presentPermission(result2);
                console.log(enhancedResults)
                // form the response in enhanced form
                let moreClearresult = PermissionPresenter.presentPermissionForOneUser(enhancedResults , id);
                response.status(ResponseCode.SUCCESS).send(moreClearresult);
            });     
        }
    });
}

async function store(request, response, next) {
    const {
        User_ID,
        API_Name,
    } = request.body;
    // check on the permission name is correct
    let API_ID = Permission.APINamingMap(API_Name)
    if(API_ID === 0)
        next(ResponseCode.WRONG_PERMISSION_NAME_ERROR)
    else{
        const NEW_USER_PERMISSIONS = [
            [User_ID , API_ID]
        ]
        let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 8";
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
                let sql2 = "INSERT INTO permissions (User_ID , API_ID) VALUES ?" ;
                console.log(sql2);
                mysql_connection.query(sql2, [NEW_USER_PERMISSIONS], function (err, result) {
                    if (err) {
                        next(ResponseCode.CAN_NOT_ADD_PERMISSION_ERROR);
                        console.log("This Permission already exist or this user Id isn't exist.");
                    }else
                        response.status(ResponseCode.SUCCESS).send("The new permission was added successfully.");
                });    
            }
        });
    }
}

async function update(request, response, next) {
    const { 
        New_API_Name,
        Old_API_Name,
    } = request.body;
    // check on the permission name is correct
    let Old_API_ID = Permission.APINamingMap(Old_API_Name);
    let New_API_ID = Permission.APINamingMap(New_API_Name);
    console.log(Old_API_ID + New_API_ID)
    if(Old_API_ID === 0 || New_API_ID === 0)
        next(ResponseCode.WRONG_PERMISSION_NAME_ERROR)
    else{
        console.log(request.params.id)
        const id = request.params.id;
        // check on the permission of the use on this endpoint
        let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 7";
        console.log(sql);
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
                let sql2 = "UPDATE permissions SET API_ID = " + New_API_ID + " WHERE User_ID = " + id + " AND API_ID = " + Old_API_ID;
                console.log(sql2);
                mysql_connection.query(sql2 , function (err, result) {
                    if (err) {
                        next(ResponseCode.DATABASE_QUERY_ERROR);
                    }else {
                        console.log(result.changedRows);
                        console.log(result);
                        if(result.changedRows === 0) {
                            next(ResponseCode.CAN_NOT_EDIT_PERMISSION_ERROR);
                            console.log("The old permission doesn't exist or the new permission already exist.");
                        } else
                            response.status(ResponseCode.SUCCESS).send("The permission informations was updated.");
                    }
                });    
            }
        });
    }
}

async function destroy(request, response, next) {
    const { API_Name } = request.body;
    // check on the permission name is correct
    let API_ID = Permission.APINamingMap(API_Name)
    if(API_ID === 0)
        next(ResponseCode.WRONG_PERMISSION_NAME_ERROR);
    else{
        console.log(request.params.id)
        const id = request.params.id;
        let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 9";
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
                let sql2 = "DELETE FROM permissions WHERE User_ID = " + id + " AND API_ID = " + API_ID ;
                console.log(sql2);
                mysql_connection.query(sql2, function (err, result2){
                    if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
                    console.log("no error in sql2")
                    console.log(result2)
                    if(result2.affectedRows === 0){
                        console.log("this permission doesn't exist");
                        next(ResponseCode.CAN_NOT_DELETE_PERMISSION_ERROR);
                    } else
                        response.status(ResponseCode.SUCCESS).send("This permission was deleted successfully");
                });     
            }
        });
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}

