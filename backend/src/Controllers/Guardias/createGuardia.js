const { Guardias } = require("../../db.js")

const createGuardias = async(req, res) =>
{
    const { name, username, surname, password, email } = req.body

    try
    {
        const emailCheck = await Guardias.findOne({ where: { email } })

        if(emailCheck) return res.status(500).send("Email registrado")

        const nuevoGuardia =
        {
            name, surname, email, password, username
        }

        const guardiaDB = await Guardias.create(nuevoGuardia)
        return res.status(200).json(guardiaDB)
    }
    catch(error)
    {
        return res.status(500).json(error.message)
    }
}

module.exports = createGuardias;