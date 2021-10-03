require('dotenv').config()
const bcrypt = require('bcrypt')
const mysql_connection = require('../../../boot/dbConnection')

const ResponseCode = require("../../../response-codes")
const User = require("../../user/models/User");
const tokenGeneration = require("../../../helpers/tokenGeneration");
const userPresenter = require("../../user/presenter/userPresenter");
async function userAccessController(request, response, next) {
    console.log("try to generate access token")
    const userRequest = request.body
    console.log(userRequest);
    try 
    {
        let sql = "SELECT User_ID FROM users WHERE First_Name = '" + userRequest.First_Name + "' AND Last_Name = '" + userRequest.Last_Name + "' AND Password = '" + userRequest.Password + "'";
        console.log(sql);
        mysql_connection.query(sql, function (err, result){
            if (err) throw err;
            if (result.length === 0)
            {
                return next("no such user")
            }
            else if (result.length === 1)
            {
                console.log(result[0].User_ID);
                const userMessage =
                {
                    name: userRequest.First_Name + userRequest.Last_Name,
                    email: userRequest.Email,
                    password: userRequest.Password
                }

                var token = tokenGeneration({ userMessage });
                logedIn_users.push({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    User_ID: result[0].User_ID
                })
                console.log(token.accessToken)
                console.log(token.refreshToken)
                response.status(200).json({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken
                });
                console.log(logedIn_users)
            }
        });
    } 
    catch (error) 
    {
        console.log(error);
        next(500)
    }
}


async function userLogout (request, responce, next)
{

}





module.exports = {
    userAccessController,
    userLogout  
}