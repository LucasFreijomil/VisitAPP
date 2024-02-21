const { Guardias } = require('../../db.js');

const updateGuard = async (req, res) =>
{
    const { id, form } = req.body;
    try
    {
        await Guardias.update( form, {where: { id } });
        res.status(200).json("Usuario modificado correctamente.");
    }
    catch(error)
    {
        res.status(500).json({ error_updateGuard: error.message })
    }
}

module.exports = updateGuard;