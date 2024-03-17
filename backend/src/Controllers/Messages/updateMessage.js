const { Messages } = require('../../db.js');

const updateMessage = async ( req, res ) =>
{
    const { id } = req.query;
    const toUpdate = req.body;

    try
    {
        await Messages.update( toUpdate, { where: { id } } );
        res.status(200).json( { success: 'Message updated' } );
    }
    catch(error)
    {
        res.status(500).json( { error_updateMessage: error.message } );
    }
}

module.exports = updateMessage;