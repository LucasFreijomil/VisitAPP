const { Visitas } = require('../../db.js');

const updateVisit = async ( req, res ) =>
{
    const form = req.body;
    const { id } = req.params;

    try
    {
        const updatedVisit = await Visitas.update( form, {where: { id } } );
        return res.status(200).json( { updatedVisit: updatedVisit } );
    }
    catch(error)
    {
        return res.status(500).json( { error_updateVisit: error.message } );
    }
}

module.exports = updateVisit;