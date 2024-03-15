const { Events, Users, Visitas } = require('../../db.js')

const handleVisits = async ( req, res ) =>
{
    const { eventId, visits, add } = req.body;

    if(add)
    {
        try
        {
            const thisEvent = await Events.findByPk( eventId, 
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
            visits.map( visitaId => thisEvent.addVisita( visitaId ) );
            res.status(200).json( { success: 'Visitas agregadas correctamente' } );
        }
        catch(error)
        {
            res.status(500).json( { error_addVisitas: error.message } );
        }
    }
    else
    {
        try
        {
            const thisEvent = await Events.findByPk( eventId, 
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
            visits.map( visitaId => thisEvent.removeVisita( visitaId ) );
            res.status(200).json( { success: 'Visita eliminada correctamente' } );
        }
        catch(error)
        {
            res.status(500).json( { error_removeVisita: error.message } );
        }
    }
}

module.exports = handleVisits;