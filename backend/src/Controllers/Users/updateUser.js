const { Users } = require("../../Models/Users")

const updateUser = async (req, res) => {
    const { id } = req.params
 // FALTA VALIDACION SI ES ADMIN
    try {
        const user = await Users.findOne({where: id})
        if(user) await Users.update({isApproved: false}, {where: {isApproved: true}})
        return res.status(200).send("Usuario aprovado")
    } catch (error) {
        return res.status(500).send("Error")
    }
}

module.exports = updateUser