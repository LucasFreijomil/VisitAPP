const { Messages, Users } = require('../../db.js');

const updateMessage = async ( req, res ) =>
{
    const { id } = req.query;
    const toUpdate = req.body;

    if(toUpdate.delink) // En caso de querer desvincular un mensaje del usuario necesitamos userId (id del usuario), delink: true(para avisarle al back) extra.
    {
        try
        {
            const thisUser = await Users.findByPk( toUpdate.userId );
            const thisMessage = await Messages.findByPk( id );
            thisUser.removeMessage( thisMessage );
            res.status(200).json( { success: 'Message delinked succesfully' } );
        }
        catch(error)
        {
            res.status(500).json( { error_deLinkMessage: error.message } );
        }
    }
    else
    {
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
}

module.exports = updateMessage;