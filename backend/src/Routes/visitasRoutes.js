const { Router } = require("express")
const createVisita = require("../Controllers/Visitas/createVisita")
const deleteVisita = require("../Controllers/Visitas/deleteVisita")

visitaRouter = Router()

visitaRouter.post("/", createVisita)
visitaRouter.delete("/:id", deleteVisita)

module.exports = visitaRouter