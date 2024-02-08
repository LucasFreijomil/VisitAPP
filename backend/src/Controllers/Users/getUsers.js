const { Users } = require("../../Models/Users")

const getUsers = async(req, res) => {
    try {
        const usuarios = await Users.findAll()
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(400).send("Error al obtener los usuarios")
    }
}

module.exports = getUsers