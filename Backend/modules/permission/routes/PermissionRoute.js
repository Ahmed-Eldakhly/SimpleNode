const express = require('express')
const {index,store,show,update,destroy} = require('../controllers/PermissionController')

const PermissionRouter = express.Router()


PermissionRouter.get("/", (request, response, next)=> {
    index(request, response, next);   
}) 

PermissionRouter.get("/:id", (request, response, next)=> {
    show(request, response, next);   
}) 

// , checkAccessToken(Role.USER)
PermissionRouter.post("/", (request, response, next)=> {
    store(request, response, next);
})

// , checkAccessToken(Role.USER)
PermissionRouter.patch("/:id", (request, response, next)=> {
    update(request, response, next);
})

// , checkAccessToken(Role.ADMIN)
PermissionRouter.delete("/:id", (request, response, next)=> {
    destroy(request, response, next);
})

module.exports = PermissionRouter;
