const bcrypt = require('bcrypt');
var validator = require("email-validator");
const ResponseCode = require("../../../response-codes")

function checkOnTheUserData(request , response , next)
{
    const {
        First_Name,
        Last_Name,
        Password,
        Email,
    } = request.body;
    if(First_Name === undefined || Last_Name === undefined || Password === undefined || Email === undefined )
        next(ResponseCode.USER_DATA_INCOMPLETE)
    if(!(validator.validate(Email)))
        next(ResponseCode.INVALID_USER_EMAIL)
}

// async function hashPassword(password)
// {
//     console.log(password);
//     let hashedtext
//     try{
//         hashedtext = await bcrypt.hash(password , 10) 
//     }
//     catch(err){
//         throw new Error("encription error");
//     }
//     return hashedtext;
// }


 module.exports = {
    checkOnTheUserData
 };