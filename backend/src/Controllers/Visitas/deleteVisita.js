const Visitas = require("../../Models/Visitas")

const deleteVisita = async(req, res) => {
    const {id} = req.params

    try {
        const visita = await Visitas.findOne({where: id})
        await visita.destroy()
    } catch (error) {
        console.log(error)
    }
}

module.exports =  deleteVisita