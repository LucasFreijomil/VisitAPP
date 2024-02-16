const { Router } = require('express');
const getEvents = require('../Controllers/Events/getEvents.js');
const postEvent = require('../Controllers/Events/postEvent.js');

eventsRouter = Router();

eventsRouter.get('/', getEvents);
eventsRouter.post('/', postEvent);

module.exports = eventsRouter;