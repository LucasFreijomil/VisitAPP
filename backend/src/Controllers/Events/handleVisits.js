const handleVisits = async ( req, res ) =>
{
    const { eventId, visits, add } = req.body;

    if(add)
    {
        try
        {
            visits.map( visitaId => eventId.addVisita( visitaId ) );
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
            visits.map( visitaId => eventId.removeVisita( visitaId ) );
            res.status(200).json( { success: 'Visita eliminada correctamente' } );
        }
        catch(error)
        {
            res.status(500).json( { error_removeVisita: error.message } );
        }
    }
}

module.exports = handleVisits;