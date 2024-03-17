const { Router } = require("express")
const getMessages = require('../Controllers/Messages/getMessages.js');
const postMessages = require('../Controllers/Messages/postMessage.js');
const deleteMessage = require('../Controllers/Messages/deleteMessage.js');
const updateMessage = require('../Controllers/Messages/updateMessage.js');

messagesRouter = Router()

messagesRouter.get('/', getMessages);
messagesRouter.post('/', postMessages);
messagesRouter.delete('/', deleteMessage);
messagesRouter.put('/', updateMessage);

module.exports = messagesRouter