const { Router } = require("express");
const getProviders = require("../Controllers/Providers/getProviders");
const updateProvider = require("../Controllers/Providers/updateProvider");
const postProvider = require("../Controllers/Providers/postProvider");
const deleteProvider = require("../Controllers/Providers/deleteProvider");

providersRouter = Router();

providersRouter.get('/', getProviders);
providersRouter.post('/', postProvider);
providersRouter.put('/', updateProvider);
providersRouter.delete('/', deleteProvider);

module.exports = providersRouter;