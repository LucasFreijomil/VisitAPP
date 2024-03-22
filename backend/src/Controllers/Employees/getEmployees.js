const { Employees, Users, Events } = require('../../db.js');
const { Op, fn, col } = require('sequelize');

const getEmployees = async ( req, res ) =>
{
    const { dni, name, surname } = req.query;

    if(dni)
    {
        try
        {
            const employeeByDni = await Employees.findByPk( dni,
                {
                    include: [
                {
                    model: Users,
                    as: 'Users',
                    attributes: [ "id", "name", "surname", "email"],
                },
                {
                    model: Events,
                    as: 'Events',
                    attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                } ]} );
            res.status(200).json( employeeByDni );
        }
        catch(error)
        {
            res.status(500).json( { error_getEmployeeByDni: error.message } );
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
                    const thisNameSurname = await Employees.findAll( { where:
                        {
                            name: { [Op.iLike]: `%${name}%`},
                            surname: { [Op.iLike]: `%${surname}%`} }, include:
                            [
                                {
                                    model: Users,
                                    as: 'Users',
                                    attributes: [ "id", "name", "surname", "email"],
                                },
                                {
                                    model: Events,
                                    as: 'Events',
                                    attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                                }
                            ] } );
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
                    const thisName = await Employees.findAll( { where: { name: { [Op.iLike]: `%${name}%`} }, include:
                        [
                            {
                                model: Users,
                                as: 'Users',
                                attributes: [ "id", "name", "surname", "email"],
                            },
                            {
                                model: Events,
                                as: 'Events',
                                attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                            }
                        ] } );
                    const thisSurname = await Employees.findAll( { where: { surname: { [Op.iLike]: `%${name}%`} }, include:
                        [
                            {
                                model: Users,
                                as: 'Users',
                                attributes: [ "id", "name", "surname", "email"],
                            },
                            {
                                model: Events,
                                as: 'Events',
                                attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                            }
                        ] } );
                    res.status(200).json( [...thisName, ...thisSurname] );
                }
                catch(error)
                {
                    res.status(500).json( { error_getByName: error.message } );
                }
            }
        }
        else
        {
            try
            {
                const allEmployees = await Employees.findAll();
                res.status(200).json( allEmployees );
            }
            catch(error)
            {
                res.status(500).json( { error_getAllEmployees: error.message } );
            }
        }
    }
}

module.exports = getEmployees;