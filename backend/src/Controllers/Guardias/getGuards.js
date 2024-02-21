const { Guardias } = require('../../db.js');

const getGuards = async ( req, res ) =>
{
    const { id, email } = req.query;

    if(id)
    {
        try
        {
            const userById = await Guardias.findByPk( id );
            res.status(200).json( userById );
        }
        catch(error)
        {
            res.status(500).json({ error_getGuardById: error.message });
        }
    }
    else
    {
        if(email)
        {
            try
            {
                const userByEmail = await Guardias.findOne( {where: { email }} );
                res.status(200).json( userByEmail );
            }
            catch(error)
            {
                res.status(500).json({ error_getGuardByEmail: error.message });
            }
        }
        else
        {
            try
            {
                const allGuards = await Guardias.findAll();
                res.status(200).json( allGuards );
            }
            catch(error)
            {
                res.status(500).json({ error_getAllGuards: error.message });
            }
        }
    }
}

module.exports = getGuards;