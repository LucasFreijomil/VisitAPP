const { Users, Visitas, Events, Messages } = require("../../db.js");
const { Op, fn, col } = require('sequelize');

const getUsers = async(req, res) =>
{
    const { id, email, name, surname, dni } = req.query;
    
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
                    attributes: ["name", "surname", "dni", "img"],
                },
                {
                    model: Events,
                    as: 'Events',
                    attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                },
                {
                    model: Messages,
                    as: 'Messages',
                    attributes: ["id", "title", "urgent", "read", "general", "body" ]
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
                        attributes: ["name", "surname", "dni", "img"],
                    },
                    {
                        model: Events,
                        as: 'Events',
                        attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                    },
                    {
                        model: Messages,
                        as: 'Messages',
                        attributes: ["id", "title", "urgent", "read", "general" ]
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
            if(name)
            {
                if(surname)
                {
                    try
                    {
                        const thisNameSurname = await Users.findAll( { where:
                            {
                                name: { [Op.iLike]: `%${name}%`},
                                surname: { [Op.iLike]: `%${surname}%`} }, include:
                            [ {
                                model: Visitas,
                                as: 'Visitas',
                                attributes: ["id", "name", "surname", "dni", "company", "work" ],
                            },
                            {
                                model: Events,
                                as: 'Events',
                                attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                            },
                            {
                                model: Messages,
                                as: 'Messages',
                                attributes: ["id", "title", "urgent", "read", "general" ]
                            } ] } );
                        res.status(200).json( thisNameSurname );
                    }
                    catch(error)
                    {
                        res.status(500).json( { error_getByNameSurname: error } );
                    }
                }
                else
                {
                    try
                    {
                        const thisName = await Users.findAll( { where: { name: { [Op.iLike]: `%${name}%`} }, include:
                            [ {
                                model: Visitas,
                                as: 'Visitas',
                                attributes: ["id", "name", "surname", "dni", "company", "work" ],
                            },
                            {
                                model: Events,
                                as: 'Events',
                                attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                            } ] } );
                        const thisSurname = await Users.findAll( { where: { surname: { [Op.iLike]: `%${name}%`} }, include:
                            [ {
                                model: Visitas,
                                as: 'Visitas',
                                attributes: ["id", "name", "surname", "dni", "company", "work" ],
                            },
                            {
                                model: Events,
                                as: 'Events',
                                attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                            } ] } );
                        res.status(200).json( [...thisName, ...thisSurname] );
                    }
                    catch(error)
                    {
                        res.status(500).json( { error_getByName: error } );
                    }
                }
            }
            else
            {
                if(dni)
                {
                    try
                    {
                        const thisDni = await Users.findAll( { where: { dni }, include:
                            [ {
                                model: Visitas,
                                as: 'Visitas',
                                attributes: ["name", "surname", "dni", "img"],
                            },
                            {
                                model: Events,
                                as: 'Events',
                                attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                            } ] } );
                        res.status(200).json( thisDni );
                    }
                    catch(error)
                    {
                        res.status(500).json( { error_getUserByDni: error } );
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
    }
}

module.exports = getUsers;