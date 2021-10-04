const ErrorResponse = require('../../../helpers/errorResponse');
const User = require("../../user/models/User");
const checkAccessToken = require("../../../middlewares/middleware");
const mysql_connection = require('../../../boot/dbConnection')
// const bcrypt = require('bcrypt');
// const userPresenter = require("../presenter/userPresenter");
const ResponseCode = require("../../../response-codes")
const ResponseMessage = require("../../../response-messages")

function index(request, response, next) {
    // let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 2";
    // console.log(sql);
    // mysql_connection.query(sql, function (err, result){
    //     if (err) throw err;
    //     console.log(result)
    //     if (result.length === 0)
    //     {
    //         console.log("length is 0")
    //         return next("You Don't have the permission for this requext");
    //     }
    //     else if (result.length === 1)
    //     {
    //         let sql2 = "SELECT * FROM users";
    //         console.log(sql2);
    //         mysql_connection.query(sql2, function (err, result){
    //             if (err) throw err;
    //             console.log("no error in sql2")
    //             response.status(200).json(result);
    //         });     
    //     }
    // });
    get_Sql().then((result) => {
        console.log(result)
        response.status(200).json(result);
    }).catch((error)=>{
        next("You Don't have the permission for this request");
    });
}

async function get_Sql(){
    let sql = "SELECT * FROM permissions WHERE User_ID = " + current_users_ID + " AND API_ID = 2";
    console.log(sql);
    await mysql_connection.query(sql, function (err, result){
        if (err) throw err;
        console.log(result)
        if (result.length === 0)
        {
            console.log("length is 0")
            throw new Error ("You Don't have the permission for this request");
        }
        else if (result.length === 1)
        {
            let sql2 = "SELECT * FROM users";
            console.log(sql2);
            mysql_connection.query(sql2, function (err, result){
                if (err) throw err;
                console.log("no error in sql2")
                console.log(result)
                return result;
            });     
        }
    });
}
async function show(request, response, next) {
    // try {
    //     const { id } = request.params;
    //     console.log(id)
    //     const user = await User.findById(id);
    //     response.status(200)
    //     response.json(userPresenter.present(user)); data
    // }
    // catch (err) {

    // }

}


async function store(request, response, next) {

    // try {

    //     const {
    //         userName,
    //         fName,
    //         lName,
    //         email,
    //         userPassword,
    //         userIamge,
    //     } = request.body;

    //     const alreadyRegister = await User.find({ email });
    //     console.log(alreadyRegister);
    //     if (!request.body) {
    //         response.status(400).send({ err: "Content can not be empty!" });
    //     }
    //     if (alreadyRegister.length) {

    //         return response.status(409).json({ err: "Email is already used!" })
    //     }
    //     const newUser = new User(
    //         {
    //             userName: userName,
    //             fName: fName,
    //             lName: lName,
    //             email: email,
    //             userPassword: userPassword,
    //             userIamge: userIamge
    //         })
    //     await newUser.save();
    //     response.status(200)
    //         .json(userPresenter.present(newUser));
    // } catch (err) {
    //     next(err);
    // }

}

async function update(req, res, next) {
    // const updatedUser = {
    //     ...(req.body.userName) ? { userName: req.body.userName } : {},
    //     ...(req.body.fName) ? { fName: req.body.fName } : {},
    //     ...(req.body.lName) ? { lName: req.body.lName } : {},
    //     ...(req.body.email) ? { email: req.body.email } : {},
    //     ...(req.body.userPassword) ? { userPassword: req.body.userPassword } : {},
    //     ...(req.body.userImage) ? { userIamge: req.body.userIamge } : {}
    // }
    // try {
    //     const userNewData = await bookModel.findOneAndUpdate({ _id: req.params.userId },
    //         updatedUser)
    //     res.send("User updated successfully")
    // }
    // catch (e) {
    //     next(e);
    // }
}



async function destroy(req, res, next) {
    // const { id } = req.params;
    // try {
    //     const result = await User.deleteOne({ _id: req.params.userId });
    //     res.json("User deleted successfully!");
    // } catch (err) {
    //     next(err);
    // }
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy,
}