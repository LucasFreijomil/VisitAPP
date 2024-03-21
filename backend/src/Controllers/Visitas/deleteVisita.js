const { Visitas, Users } = require('../../db.js');

const deleteVisita = async(req, res) =>
{
    const { dni, userId } = req.query;

    try
    {
        const thisVisit = await Visitas.findByPk( dni );
        const thisUser = await Users.findByPk( userId );

        thisUser.removeVisita( thisVisit );

        res.status(200).json( { Success: `Visit succesfully disconnected.` } );
    }
    catch(error)
    {
        return res.status(500).json( error.message );
    }
}

module.exports =  deleteVisita;