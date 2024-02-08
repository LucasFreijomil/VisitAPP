const Visitas = require("../../Models/Visitas")

const deleteVisita = async(req, res) => {
    const {id} = req.params

    try {
        const visita = await Visitas.findOne({where: id})
        await visita.destroy()
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports =  deleteVisita