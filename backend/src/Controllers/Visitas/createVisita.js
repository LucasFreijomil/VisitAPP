const { Visitas } = require("../../db.js");

const createVisita = async (req, res) =>
{
    const {name, surname, dni, empresa, labor} = req.body
    try
    {
        const nuevaVisita =
        {
            name, surname, dni, empresa, labor
        };

        const visita = await Visitas.create(nuevaVisita);
        return res.status(201).json( visita );
    }
    catch(error)
    {
        return res.status(500).json(error.message)
    }
}

module.exports = createVisita;