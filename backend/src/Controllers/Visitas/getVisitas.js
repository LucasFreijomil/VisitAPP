const {Visitas, Events, Users} = require("../../db");

const getVisitas = async (req, res) =>
{
    const { dni, name, surname } = req.query;

    if(dni)
    {
        try
        {
            const visitByDni = await Visitas.findByPk( dni,
                {
                    include:
                    [ {
                            model: Users,
                            as: 'Users',
                            attributes: ["id", "name", "surname", "email"]
                    },
                    {
                            model: Events,
                            as: 'Events',
                            attributes: ["id", "title", "date", "body"]
                    } ]
                } );
            res.status(200).json( visitByDni );
        }
        catch(error)
        {
            res.status(500).json( { error_getVisitByDni: error.message } );
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
                    const thisNameSurname = await Visitas.findAll( { where:
                        {
                            name: { [Op.iLike]: `%${name}%`},
                            surname: { [Op.iLike]: `%${surname}%`} }, include:
                        [ {
                            model: Users,
                            as: 'Users',
                            attributes: ["id", "name", "surname", "username", "email" ],
                        },
                        {
                            model: Events,
                            as: 'Events',
                            attributes: ["id", "title", "date", "body"]
                        } ] } );
                    res.status(200).json( thisNameSurname );
                }
                catch(error)
                {
                    res.status(500).json( { error_getVisitByNameSurname: error } );
                }
            }
            else
            {
                try
                {
                    const thisName = await Visitas.findAll( { where: { name: { [Op.iLike]: `%${name}%`} }, include:
                        [ {
                            model: Users,
                            as: 'Users',
                            attributes: ["id", "name", "surname", "username", "email" ],
                        },
                        {
                            model: Events,
                            as: 'Events',
                            attributes: ["id", "title", "date", "body"]
                        }] } );
                    const thisSurname = await Visitas.findAll( { where: { surname: { [Op.iLike]: `%${name}%`} }, include:
                        [ {
                            model: Users,
                            as: 'Users',
                            attributes: ["id", "name", "surname", "username", "email" ],
                        },
                        {
                            model: Events,
                            as: 'Events',
                            attributes: ["id", "title", "date", "body"]
                        }] } );
                    res.status(200).json( [...thisName, ...thisSurname] );
                }
                catch(error)
                {
                    res.status(500).json( { error_getVisitByName: error } );
                }
            }
            
        } else
        {
            try
            {
                const allVisits = await Visitas.findAll();
                res.status(200).json( allVisits );
            }
            catch(error)
            {
                res.status(500).json( { error_getAllVisits: error } );
            }
        }
    }
}

module.exports = getVisitas;