const { Events } = require('../../db.js');

const updateEvent = async ( req, res ) =>
{
    const form = req.body;
    const { id } = req.params;

    try
    {
        const updatedEvent = await Events.update(form, { where: { id } } );
        res.status(200).json( { updatedEvent: updatedEvent } );
    }
    catch(error)
    {
        res.status(500).json( { error_updateEvent: error.message } );
    }
}

module.exports = updateEvent;