const { Router } = require("express");
const createGuardias = require("../Controllers/Guardias/createGuardia");
const deleteGuardia = require("../Controllers/Guardias/deleteGuardia");
const updateGuard = require('../Controllers/Guardias/updateGuard.js');
const switchGuard = require('../Controllers/Guardias/switchGuard.js');
const getGuards = require('../Controllers/Guardias/getGuards.js');
const login = require("../Controllers/Guardias/login.js");
const decodeGuard = require('../Controllers/Guardias/decodeGuard.js');

guardiasRouter = Router();

guardiasRouter.get('/', getGuards);
guardiasRouter.get('/decode', decodeGuard);
guardiasRouter.post("/", createGuardias);
guardiasRouter.post('/login', login);
guardiasRouter.put('/', updateGuard);
guardiasRouter.put('/:id', switchGuard);
guardiasRouter.delete("/:id", deleteGuardia);

module.exports = guardiasRouter;