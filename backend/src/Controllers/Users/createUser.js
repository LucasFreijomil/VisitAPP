const { Users } = require("../../Models/Users")

const createUser = async(res, req) => {
    const { name, surname, email, password, reviewImages } = req.body

    try {
        const emailCheck = await Users.findOne({where: email})

        if(emailCheck) return res.status(500).send("El email ya esta registrado")
        
        const nuevoUsuario = {
            name,
            surname,
            email,
            password,
            reviewImages,
            isAdmin: false,
            isApproved: false
        }

        const userDB = await Users.create(nuevoUsuario)
        return res.status(201).json(userDB)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = createUser