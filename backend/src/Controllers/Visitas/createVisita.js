const { Visitas, Users } = require("../../db.js");

const createVisita = async (req, res) =>
{
    const { name, surname, dni, company, work, userId } = req.body
    try
    {
        const nuevaVisita =
        {
            name, surname, dni, company, work
        };

        const visita = await Visitas.create(nuevaVisita);
        const thisUser = await Users.findByPk( userId );
        thisUser.addVisitas( visita.id );

        return res.status(201).json( visita );
    }
    catch(error)
    {
        return res.status(500).json(error.message)
    }
}

module.exports = createVisita;