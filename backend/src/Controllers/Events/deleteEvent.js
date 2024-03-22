const { Events } = require('../../db.js');

const deleteEvent = async ( req, res ) =>
{
    const { id } = req.query;

    try
    {
        await Events.destroy( { where: { id } } );
        res.status(200).json( { success: 'Event deleted' } );
    }
    catch(error)
    {
        res.status(500).json( { error_deleteEvent: error.message } );
    }
}

module.exports = deleteEvent;