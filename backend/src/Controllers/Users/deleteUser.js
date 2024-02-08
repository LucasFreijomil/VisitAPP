const { Users } = require("../../Models/Users")

const deleteUser = async(req, res) => {
    const { id } = req.params

    try {
        const usuario = await Users.findOne({where: id})
        await usuario.destroy()
        const usuarios = await Users.findAll()
        return res.status(200).json(usuarios) // nose para que mandar todos los usarios pero lo copie del PF asi si no sirve lo borramos
    } catch (error) {
        console.log(error)
        return res.status(400).send("Erorr al borrar usuario")
    }
}

module.exports = deleteUser