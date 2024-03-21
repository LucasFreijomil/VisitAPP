const { Router } = require("express");
const sendMail = require("../Controllers/Mail/sendMail");

mailRouter = Router();

mailRouter.post('/', sendMail);

module.exports = mailRouter;