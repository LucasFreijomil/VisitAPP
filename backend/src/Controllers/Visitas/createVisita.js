const {visitas} = require("../../Models/Visitas")

const createVisita = async(req, res) => {
    const {name, surname, dni, empresa} = req.body
    try {
        const nuevaVisita = {
            name, surname, dni, empresa
        }

        const visita = await visitas.create(nuevaVisita)
        return res.status(201).json(visita)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = createVisita;