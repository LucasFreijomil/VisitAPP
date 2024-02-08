const { Router } = require("express")
const createGuardias = require("../Controllers/Guardias/createGuardia")
const deleteGuardia = require("../Controllers/Guardias/deleteGuardia")

guardiasRouter = Router()

guardiasRouter.post("/", createGuardias)
guardiasRouter.delete("/:id", deleteGuardia)

module.exports = guardiasRouter