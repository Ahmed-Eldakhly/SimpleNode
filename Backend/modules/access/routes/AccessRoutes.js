const express = require('express')
const AccessController = require('../controllers/AccessController')

const AccessRouter = express.Router()
AccessRouter.post("/user" , (request, response, next) => {
    AccessController.userAccessController(request, response, next);
})

AccessRouter.post("/userLogout" , (request, response, next) => {
    AccessController.userLogout(request, response, next);
})

AccessRouter.post("/refreshToken" , (request, response, next) => {
    AccessController.refreshToken(request, response, next);
})


module.exports = AccessRouter;