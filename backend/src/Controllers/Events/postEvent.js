const { Users, Events, Visitas } = require("../../db")

const postEvent = async (req, res) => {
	const { title, date, startsAt, endsAt, body, alarm, alarmDistance, visitDni, userId } = req.body;

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
			alarmDistance
		};

		const newEventCreated = await Events.create( newEvent );

		const thisUser = await Users.findByPk(userId);
		await thisUser.addEvent(newEventCreated);

		const selectedVisits = await Visitas.findAll({ where: { dni: visitDni }});
		await newEventCreated.addVisitas(selectedVisits);

        return res.status(201).json(newEventCreated)
	} catch (error) 
    {
		console.log(error)
        return res.status(500).json({error_creating_event: error})
    }
};

module.exports = postEvent;
