const express = require('express')
const {index,store,show,update,destroy} = require('../controllers/UserController')

const userRouter = express.Router()

userRouter.get("/", (request, response, next)=> {
    index(request, response, next);
})

userRouter.get("/:id", async (request, response, next)=> {
    console.log(request.params.id)
    show(request, response, next);
})

userRouter.post("/", async(request, response, next)=> {
    store(request, response, next);
})

userRouter.patch("/:id", async (request, response, next)=> {
    update(request, response, next);
})

userRouter.delete("/:id", async (request, response, next)=> {
    destroy(request, response, next);
})

module.exports = userRouter;