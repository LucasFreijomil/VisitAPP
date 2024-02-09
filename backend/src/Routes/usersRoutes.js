const { Router } = require("express")
const login = require("../Controllers/Users/login")
const approveUser = require("../Controllers/Users/approveUser.js")
const deleteUser = require("../Controllers/Users/deleteUser")
const getUsers = require("../Controllers/Users/getUsers")
const createUser = require("../Controllers/Users/createUser")
const approvedUsers = require("../Controllers/Users/approvedUsers")
const decodeUser = require('../Controllers/Users/decodeUser.js');

userRouter = Router()

userRouter.get("/", getUsers)
userRouter.get("/notApproved", approvedUsers)
userRouter.get("/decode", decodeUser);
userRouter.post("/login", login)
userRouter.post("/", createUser)
userRouter.put("/:id", approveUser)
userRouter.delete("/:id", deleteUser)

module.exports = userRouter