const { Visitas } = require('../../db.js');

const deleteVisita = async(req, res) =>
{
    const {id} = req.params

    try
    {
        await Visitas.destroy( { where: { id } } );
        res.status(200).json( { Success: `Visita deleted` } );
    }
    catch(error)
    {
        return res.status(500).json(error.message);
    }
}

module.exports =  deleteVisita;