const { Messages, Users } = require('../../db.js');

const getMessages = async (req, res) =>
{
    const { id, title } = req.query;

    if(id)
    {
        try
            {
                const idMessage = await Messages.findByPk( id, { include:
                    [ {
                        model: Users,
                        as: 'Users',
                        attributes: ["id", "email", "username" ]
                    } ] } );
                res.status(200).json( idMessage );
            }
            catch(error)
            {
                res.status(500).json( { error_getMessagesById: error.message } );
            }
    }
    else
    {
        if(title)
        {
            try
            {
                const titleMessage = await Messages.findAll( { where: { title } } );
                res.status(200).json( titleMessage );
            }
            catch(error)
            {
                res.status(500).json( { error_getMessagesByTitle: error.message } );
            }
        }
        else
        {
            try
            {
                const allMessages = await Messages.findAll();
                res.status(200).json( allMessages );
            }
            catch(error)
            {
                res.status(500).json( { error_getMessages: error.message } );
            }
        }
    }
}

module.exports = getMessages ;