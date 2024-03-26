const { Employees, Users } = require('../../db.js');

const updateEmployee = async ( req, res ) =>
{
    const { id, dni } = req.query;
    const newData = req.body;
    console.log(dni);
    
    if(id)  // Si llega ID espero relacionar el Employee con otro usuario
    {
        try
        {
            const thisUser = await Users.findByPk( id );
            const thisEmployee = await Employees.findByPk( dni );
            await thisUser.addEmployee( thisEmployee );
            let contains = [];
            thisEmployee.labor.map( labor => labor.includes(newData.labor) && contains.push(1) );
            console.log( contains.length>0 ? 'Encontró repetido' : 'No encontró repetido' );
            contains.length == 0 && await Employees.update( { labor: [ ...thisEmployee.labor, newData.labor ] }, { where: { dni } } );
            res.status(200).json( { success: 'Employee succesfully related to the user.' } );
        }
        catch(error)
        {
            res.status(500).json( { error_relateEmployeeUser: error.message } );
        }
    }
    else
    {
        try
        {
            await Employees.update( newData, { where: { dni } } );
            res.status(200).json( { success: 'Employee succesfully updated.'} );
        }
        catch(error)
        {
            res.status(500).json( { error_updateEmployee: error.message } );
        }
    }
}

module.exports = updateEmployee;