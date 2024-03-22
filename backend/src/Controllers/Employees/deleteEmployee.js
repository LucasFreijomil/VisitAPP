const { Employees, Users } = require('../../db.js');

const deleteEmployee = async ( req, res ) =>
{
    const { dni, id } = req.query;

    if(id)
    {
        try
        {
            const thisUser = await Users.findByPk( id );
            const thisEmployee = await Employees.findByPk( dni );
            thisUser.removeEmployee( thisEmployee );

            res.status(200).json( { success: 'Employee/user relation deleted.' } );
        }
        catch(error)
        {
            res.status(500).json( { error_delinkEmployee: error.message } );
        }
    }
    else
    {
        try
        {
            const thisEmployee = await Employees.findByPk( dni );
            await thisEmployee.destroy();

            res.status(200).json( { success: 'Employee succesfully deleted.' } )
        }
        catch(error)
        {
            res.status(500).json( { error_deleteEmployee: error.message } );
        }
    }
}

module.exports = deleteEmployee;