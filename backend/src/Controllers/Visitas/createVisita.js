const {visitas} = require("../../Models/Visitas")

const createVisita = async(req, res) => {
    const {name, surname, dni, empresa} = req.body
    try {
        const nuevaVisita = {
            name, surname, dni, empresa
        }

        const visita = visitas.create(nuevaVisita)
        res.status(201).json({ok:"Visita creada"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: "Error al crear la visita"})
    }
}

module.exports = createVisita;