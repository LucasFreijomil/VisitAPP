const { Users } = require("../../db.js");

const getUsers = async(req, res) =>
{
    const { id, email } = req.body;

    if(id)
    {
        try
        {
            const userById = await Users.findByPk( id );
            res.status(200).json( userById );
        }
        catch(error)
        {
            res.status(500).json( { error_getUserById: error.message } );
        }
    }
    else
    {
        if(email)
        {
            try
            {
                const userByMail= await Users.findOne( { where: { email } } );
                res.status(200).json( userByMail );
            }
            catch(error)
            {
                res.status(500).json( {error_getUserByMail: error.message } );
            }
        }
        else
        {
            try
            {
                const usuarios = await Users.findAll()
                return res.status(200).json(usuarios)
            }
            catch(error)
            {
                return res.status(400).send("Error al obtener los usuarios")
            }
        }
    }
}

module.exports = getUsers;