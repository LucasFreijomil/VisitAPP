const { Router } = require("express")
const createVisita = require("../Controllers/Visitas/createVisita")
const deleteVisita = require("../Controllers/Visitas/deleteVisita")
const getVisitas = require("../Controllers/Visitas/getVisitas")

visitaRouter = Router()

visitaRouter.get("/", getVisitas)
visitaRouter.post("/", createVisita)
visitaRouter.delete("/:id", deleteVisita)

module.exports = visitaRouter