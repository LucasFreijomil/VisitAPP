const { Messages } = require('../../db.js');

const deleteMessage = async ( req, res ) =>
{
    const { id } = req.query;

    try
    {
        await Messages.destroy( { where: { id } } );
        res.status(200).json( { success: 'Message eliminated.' } );
    }
    catch(error)
    {
        res.status(500).json( { error_deleteMessage: error } );
    }
}

module.exports = deleteMessage;