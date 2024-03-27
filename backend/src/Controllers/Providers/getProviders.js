const { Providers, Users } = require('../../db.js');
const { Op } = require('sequelize');

const getProviders = async ( req, res ) =>
{
    const { cuit, razonSocial } = req.query;

    if(cuit)
    {
        try
        {
            const providerByCuit = await Providers.findByPk( cuit,
                {
                    include: [
                {
                    model: Users,
                    as: 'Users',
                    attributes: [ "id", "name", "surname", "email"],
                } ] } );
            res.status(200).json( providerByCuit );
        }
        catch(error)
        {
            res.status(500).json( { error_getProviderByCuil: error.message } );
        }
    }
    else
    {
        if(razonSocial)
        {
            try
            {
                const thisSocial = await Providers.findAll( { where: { razonSocial: { [Op.iLike]: `%${razonSocial}%`} }, include:
                    [
                        {
                            model: Users,
                            as: 'Users',
                            attributes: [ "id", "name", "surname", "email"],
                        }
                    ] } );
                res.status(200).json( thisSocial );
            }
            catch(error)
            {
                res.status(500).json( { error_getByRazonSocial: error.message } );
            }
        }
        else
        {
            try
            {
                const allProviders = await Providers.findAll();
                res.status(200).json( allProviders );
            }
            catch(error)
            {
                res.status(500).json( { error_getAllProviders: error.message } );
            }
        }
    }
}

module.exports = getProviders;