const { Users, Employees } = require('../../db.js');

const postEmployee = async ( req, res ) =>
{
    const { id } = req.query;   //ID del usuario
    const newEmployee = req.body;

    try
    {
        const thisEmployee = await Employees.create( newEmployee );
        const thisUser = await Users.findByPk( id );
        await thisEmployee.addUser( thisUser );
        res.status(200).json( thisEmployee );
    }
    catch(error)
    {
        res.status(500).json( { error_postEmployee: error.message } );
    }
}

module.exports = postEmployee;