const { Guardias } = require("../../Models/Guardias")

const createGuardias = async(req, res) => {
    const {name, surname, email, password} = req.body

    try {
        const emailCheck = await Guardias.findOne({where: email})
        if(emailCheck) return res.status(400).send("Email registrado")

        const nuevoGuardia = {
            name, surname, email, password
        }
        const guardiaDB = Guardias.create(nuevoGuardia)
        return res.status(201).json(guardiaDB)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = createGuardias