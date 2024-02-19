const { Events } = require('../../db.js');

const postEvent = async (req, res) => {
	const { title, date, startsAt, endsAt, body, alarm, visitId, userId } = req.body;

	try 
    {
		const newEvent = 
        {
			title,
			date,
			startsAt,
			endsAt,
			body,
			alarm,
			visitId,
			userId,
		};

        const eventCreated = await Events.create(newEvent)

        return res.status(201).json(eventCreated)
	} catch (error) 
    {
        return res.status(500).json({error_creating_event: error})
    }
};

module.exports = postEvent;
