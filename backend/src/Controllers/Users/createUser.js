const { Users } = require("../../db.js")

const createUser = async (req, res) =>
{
    const newUserData = req.body;

    try
    {
        const emailCheck = await Users.findOne( { where: {email: newUserData.email} } );

        if(emailCheck) return res.status(500).send("El email ya esta registrado")
        
        const newUser = await Users.create( newUserData );
        
        return res.status(201).json( newUser );

    }
    catch(error)
    {
        return res.status(500).send( { error_createUser: error.message } );
    }
}

module.exports = createUser