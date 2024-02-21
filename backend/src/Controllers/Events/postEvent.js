const { Users, Events, Visitas } = require("../../db")

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
		};

		const newEventCreated = await Events.create( newEvent );

		const thisUser = await Users.findByPk(userId);
		await thisUser.addEvent(newEventCreated);

		const selectedVisits = await Visitas.findAll({ where: { id: visitId }});
		await newEventCreated.addVisitas(selectedVisits);

        return res.status(201).json(newEventCreated)
	} catch (error) 
    {
		console.log(error)
        return res.status(500).json({error_creating_event: error})
    }
};

module.exports = postEvent;
