const { Users } = require("../../db.js")

const createUser = async (req, res) =>
{
    const { name, surname, email, username, password, reviewImages } = req.body;

    try
    {
        const emailCheck = await Users.findOne( { where: {email} } );

        if(emailCheck) return res.status(500).send("El email ya esta registrado")
        
        const nuevoUsuario = {
            name,
            surname,
            email,
            username,
            password,
            reviewImages
        }

        const userDB = await Users.create( nuevoUsuario );
        return res.status(201).json( userDB );

    }
    catch(error)
    {
        return res.status(500).send( { error_createUser: error.message } );
    }
}

module.exports = createUser