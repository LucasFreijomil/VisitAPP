const { Guardias } = require("../../Models/Guardias")

const deleteGuardia = async(req, res) => {
    const { id } = req.params

    try {
        const eliminado = await Guardias.findOne({where: id})
        eliminado.destroy()
        return res.status(201).send("Guardia eliminado con exito")
    } catch (error) {
        return res.status(500).jsone(error.message)
    }
}

module.exports = deleteGuardia