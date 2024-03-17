const { Events, Users, Visitas } = require('../../db.js');

const getEvents = async ( req, res) =>

{ 
    const { id } = req.query;

        if (id) {
            try 
            {
                const eventById = await Events.findByPk( id, 
                    {
                        include: [
                            {
                                model: Users,
                                as: 'User',
                                attributes: ["id", "name", "surname", "username", "email"]
                            },
                            {
                                model: Visitas,
                                as: 'Visitas',
                                through: 'events_int_visits',
                            }
                        ]})
                    res.status(200).json( eventById );
            }
            catch (error)
            {
                res.status(500).json( { error_getEventById: error.message } )
            }
        } else
        {
            try
            {
                const allEvents = await Events.findAll();
                return res.status(200).json(allEvents)
            }
            catch (error)
            {
                return res.status(400).send("Error geting all events ", error.message)
            }
        }
}

module.exports = getEvents;