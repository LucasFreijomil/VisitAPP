const { Router } = require("express")
const login = require("../Controllers/Users/login")
const updateUser = require("../Controllers/Users/updateUser")
const deleteUser = require("../Controllers/Users/deleteUser")
const getUsers = require("../Controllers/Users/getUsers")
const createUser = require("../Controllers/Users/createUser")

userRouter = Router()

userRouter.get("/", getUsers)
userRouter.post("/login", login)
userRouter.post("/", createUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

module.exports = userRouter