const { Providers, Users } = require('../../db.js');

const updateProvider = async ( req, res ) =>
{
    const { id, cuit } = req.query;
    const newData = req.body;
    
    if(id)  // Si llega ID espero relacionar el Employee con otro usuario
    {
        try
        {
            const thisUser = await Users.findByPk( id );
            const thisProvider = await Providers.findByPk( cuit );

            await thisUser.addProvider( thisProvider );

            res.status(200).json( { success: 'Provider/User succesfully related.' } );
        }
        catch(error)
        {
            res.status(500).json( { error_relateProviderUser: error.message } );
        }
    }
    else
    {
        try
        {
            await Providers.update( newData, { where: { cuit } } );
            res.status(200).json( { success: 'Provider succesfully updated.'} );
        }
        catch(error)
        {
            res.status(500).json( { error_updateProvider: error.message } );
        }
    }
}

module.exports = updateProvider;