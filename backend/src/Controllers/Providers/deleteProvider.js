const { Providers, Users } = require('../../db.js');

const deleteProvider = async ( req, res ) =>
{
    const { cuit, id } = req.query;

    if(id)
    {
        try
        {
            const thisUser = await Users.findByPk( id );
            const thisProvider = await Providers.findByPk( cuit );
            thisUser.removeProvider( thisProvider );

            res.status(200).json( { success: 'Provider/user relation deleted.' } );
        }
        catch(error)
        {
            res.status(500).json( { error_delinkProvider: error.message } );
        }
    }
    else
    {
        try
        {
            const thisProvider = await Providers.findByPk( cuit );
            await thisProvider.destroy();

            res.status(200).json( { success: 'Provider succesfully deleted.' } )
        }
        catch(error)
        {
            res.status(500).json( { error_deleteProvider: error.message } );
        }
    }
}

module.exports = deleteProvider;