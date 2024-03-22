const { Router } = require('express');
const getEvents = require('../Controllers/Events/getEvents.js');
const postEvent = require('../Controllers/Events/postEvent.js');
const updateEvent = require('../Controllers/Events/updateEvent.js');
const handleVisits = require('../Controllers/Events/handleVisits.js');
const deleteEvent = require('../Controllers/Events/deleteEvent.js');

eventsRouter = Router();

eventsRouter.get('/', getEvents);
eventsRouter.post('/', postEvent);
eventsRouter.put('/:id', updateEvent);
eventsRouter.put('/', handleVisits )
eventsRouter.delete('/', deleteEvent);

module.exports = eventsRouter;