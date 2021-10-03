const express = require('express')
const {index,store,show,update,destroy} = require('../controllers/UserController')

const User = require('../models/User');
//const advancedResults = require('../../../middlewares/advancedQueries');

const userRouter = express.Router()

const checkAccessToken = require("../../../middlewares/middleware")

userRouter.get("/", (request, response, next)=> {
    index(request, response, next);   
}) 

userRouter.get("/:id", async (request, response, next)=> {
    show(request, response, next);
})

userRouter.post("/", (request, response, next)=> {
    store(request, response, next);
})

userRouter.patch("/:id", async (request, response, next)=> {
    update(request, response, next);
})

userRouter.delete("/:id", async (request, response, next)=> {
    destroy(request, response, next);
})

module.exports = userRouter;