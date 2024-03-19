const { Messages, Users } = require('../../db.js');

const postMessages = async (req, res) =>
{
    const { title, body, urgent, general, userId } = req.body;
    console.log("LLegó este userId: ", userId);

    try
    {
        const thisMessage = await Messages.create( { title, body, urgent, general } );
        const thisUser = await Users.findAll( { where: { id: userId } } );

        thisUser.forEach( async ( user ) => {await user.addMessage( thisMessage ); console.log("USER: ", user);} );

        res.status(200).json( { Message_title: thisMessage.title, Status: 'Created succesfully' } );
    }
    catch(error)
    {
        res.status(500).json( { error_postMessage: error.message } );
    }
}

module.exports = postMessages ;