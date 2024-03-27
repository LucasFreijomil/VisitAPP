const { Users, Providers } = require('../../db.js');

const postProvider = async ( req, res ) =>
{
    const { id } = req.query;   //ID del usuario
    const newProvider = req.body;

    try
    {
        const thisProvider = await Providers.create( newProvider );
        const thisUser = await Users.findByPk( id );
        await thisProvider.addUser( thisUser );
        res.status(200).json( thisProvider );
    }
    catch(error)
    {
        res.status(500).json( { error_postProvider: error.message } );
    }
}

module.exports = postProvider;