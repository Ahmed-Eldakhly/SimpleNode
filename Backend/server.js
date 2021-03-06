require("./boot/requires");
require('./boot/dbConnection');
const cors = require('cors');
const express = require('express');
const errorHandler = require('./middlewares/error');
const jwt = require('jsonwebtoken');

const Access = require("./modules/access/routes/AccessRoutes");
const checkAccessToken = require("./middlewares/middleware");
const UserRouter = require("./modules/user/routes/UserRoute");
const permissionRouter = require('./modules/permission/routes/PermissionRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    console.log(new Date(), req.url, req.method)
    next()
})

global.logedIn_users = [];
global.current_users_ID;

// end point for access
app.use("/login", Access);

// middleware to check on the token
app.use((req, res, next) => {
    console.log("check token")
    checkAccessToken(req, res, next);
})

// end point for user
app.use("/users", UserRouter);

//end point for permission
app.use("/permissions", permissionRouter);

app.listen(process.env.PORT, (err) => {
    if (err)
        console.log("the port " + process.env.PORT + " is busy");
    else
        console.log("the server started correcttly on port " + process.env.PORT);
});


//error handeler middleware
app.use(errorHandler);