const tokenGeneration = require('../helpers/tokenGeneration')
const ResponseCode = require("../response-codes");
const jwt = require("jsonwebtoken");
const { response } = require('express');

//check on token
function checkAccessToken(req, res, next) {
    console.log("HI i am in th check access token")
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')[1];
        console.log(bearer)
        try {
            res = jwt.verify(bearer, process.env.USER_ACCESS_TOKEN_SECRET);
            for (let i = 0; i < logedIn_users.length; i++)
            {
                if(logedIn_users[i].accessToken === bearer)
                {
                    current_users_ID = logedIn_users[i].User_ID;
                    next();
                    return;
                }
            }
            next(ResponseCode.AUTHENTICATION_ERROR);
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

// function checkRefreshToken(req, res, next) {
//     console.log("HI i am in th check refresh token")
//     const bearerHeader = req.headers.authorization;
//     const bearer = bearerHeader.split(' ')[1];
//     // req.token = bearer;
//     try {
//         let check =  jwt.verify(bearer, process.env.USER_REFRESH_TOKEN_SECRET);
//         var token = tokenGeneration(bearer);
//         for (let i = 0; i < logedIn_users.length; i++)
//         {
//             if(logedIn_users[i].refreshToken === bearer)
//             {
//                 current_users_ID = logedIn_users[i].User_ID;
//                 logedIn_users[i]({
//                     accessToken: token.accessToken,
//                     refreshToken: token.refreshToken,
//                     User_ID: current_users_ID
//                 })
//                 break;
//             }
//         }
//         res.newAuthorization = {
//             accessToken: token.accessToken,
//             refreshToken: token.refreshToken
//         }
//     } catch (error) {
//         console.log("no refresh token")
//         next(ResponseCode.AUTHENTICATION_ERROR);
//     }  
// }

module.exports = checkAccessToken;