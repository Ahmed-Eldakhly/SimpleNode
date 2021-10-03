const express = require('express')
const AccessController = require('../controllers/AccessController')

const AccessRouter = express.Router()
// AccessRouter.get("/" , async (request, response, next) => {
//     console.log("I am here");
// })
AccessRouter.post("/user" , async (request, response, next) => {
    await AccessController.userAccessController(request, response, next);
})

AccessRouter.post("/userLogout" , async (request, response, next) => {
    await AccessController.userLogout(request, response, next);
})


module.exports = AccessRouter;