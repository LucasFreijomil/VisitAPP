const { Router } = require("express")
const createVisita = require("../Controllers/Visitas/createVisita")
const deleteVisita = require("../Controllers/Visitas/deleteVisita")
const getVisitas = require("../Controllers/Visitas/getVisitas")
const updateVisit = require('../Controllers/Visitas/updateVisit');

visitaRouter = Router()

visitaRouter.get("/", getVisitas)
visitaRouter.post("/", createVisita)
visitaRouter.put('/:id', updateVisit);
visitaRouter.delete("/:id", deleteVisita)

module.exports = visitaRouter