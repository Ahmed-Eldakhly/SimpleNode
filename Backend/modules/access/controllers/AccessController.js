require('dotenv').config()
const jwt = require("jsonwebtoken");
//const bcrypt = require('bcrypt')
const mysql_connection = require('../../../boot/dbConnection')

const ResponseCode = require("../../../response-codes")
const tokenGeneration = require("../../../helpers/tokenGeneration");
async function userAccessController(request, response, next) {
    console.log("try to generate access token")
    const userRequest = request.body
    console.log(userRequest);
    try 
    {
        let sql = "SELECT User_ID FROM users WHERE First_Name = '" + userRequest.First_Name + "' AND Last_Name = '" + userRequest.Last_Name + "' AND Password = '" + userRequest.Password + "'";
        console.log(sql);
        mysql_connection.query(sql, function (err, result){
            if (err) next(ResponseCode.DATABASE_QUERY_ERROR);
            if (result.length === 0)
            {
                return next(ResponseCode.AUTHENTICATION_ERROR)
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
        next(ResponseCode.SERVER_ERROR)
    }
}


async function userLogout (request, responce, next)
{
    console.log("HI i am in th remove access token")
    const bearerHeader = request.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')[1];
        console.log(bearer)
        try {
            result = jwt.verify(bearer, process.env.USER_ACCESS_TOKEN_SECRET);
            for (let i = 0; i < logedIn_users.length; i++)
            {
                if(logedIn_users[i].accessToken === bearer)
                {
                    logedIn_users.splice(i, 1);
                    responce.status(ResponseCode.SUCCESS).send("you loged out.");
                    break;
                }
            }
        } catch (error) {
            // checkRefreshToken(req, res, next);
            next(ResponseCode.AUTHENTICATION_ERROR);
        }
    } 
    else 
    {
        console.log("no access token")
        next(ResponseCode.AUTHENTICATION_ERROR);
    }
}

async function refreshToken (request, responce, next)
{
    console.log("HI i am in th check refresh token")
    const bearerHeader = req.headers.authorization;
    const bearer = bearerHeader.split(' ')[1];
    // req.token = bearer;
    try {
        let check =  jwt.verify(bearer, process.env.USER_REFRESH_TOKEN_SECRET);
        var token = tokenGeneration(bearer);
        for (let i = 0; i < logedIn_users.length; i++)
        {
            if(logedIn_users[i].refreshToken === bearer)
            {
                current_users_ID = logedIn_users[i].User_ID;
                logedIn_users[i]({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    User_ID: current_users_ID
                })
                break;
            }
        }
        res.newAuthorization = {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken
        }
    } catch (error) {
        console.log("no refresh token")
        next(ResponseCode.AUTHENTICATION_ERROR);
    }  
}





module.exports = {
    userAccessController,
    userLogout,
    refreshToken  
}