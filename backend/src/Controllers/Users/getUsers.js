const { Users, Visitas, Events } = require("../../db.js");

const getUsers = async(req, res) =>
{
    const { id, email } = req.query;
    
    if(id)
    {
        try
        {
            const userById = await Users.findByPk( id,
                {
                    include: [
                {
                    model: Visitas,
                    as: 'Visitas',
                    attributes: ["id", "name", "surname", "dni", "company", "work" ]
                },
                {
                    model: Events,
                    as: 'Events',
                    attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                }]} );
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
                const userByMail= await Users.findOne( { where: { email }, include:
                    [ {
                        model: Visitas,
                        as: 'Visitas',
                        attributes: ["id", "name", "surname", "dni", "company", "work" ],
                    } ] } );
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