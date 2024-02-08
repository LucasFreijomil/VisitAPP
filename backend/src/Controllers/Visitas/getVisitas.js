const Visitas = require("../../Models/Visitas")

const getVisitas = async(req, res) => {
    try {
        const allVisitas = await Visitas.findAll()
        return res.status(200).json(allVisitas)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = getVisitas