const { Visitas, Users } = require("../../db.js");

const createVisita = async (req, res) =>
{
    const { name, surname, dni, img, userId } = req.body
    
    try
    {
        const alreadyExisting = await Visitas.findByPk( dni );
        if(alreadyExisting!==null)
        {
            const thisUser = await Users.findByPk( userId );
            thisUser.addVisitas( alreadyExisting );
            res.status(200).json( { alreadyExisting: `Visit DNI ${dni} already exists.` } );
        }

        const nuevaVisita =
        {
            name, surname, dni, img
        };

        const visita = await Visitas.create(nuevaVisita);
        const thisUser = await Users.findByPk( userId );
        thisUser.addVisitas( visita );

        return res.status(200).json( visita );
    }
    catch(error)
    {
        return res.status(500).json({error_createVisitas: error.message})
    }
}

module.exports = createVisita;