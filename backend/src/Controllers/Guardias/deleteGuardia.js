const { Guardias } = require("../../db.js");

const deleteGuardia = async(req, res) =>
{
    const { id } = req.params

    try
    {
        const eliminado = await Guardias.findByPk( id );

        eliminado.destroy()

        return res.status(200).send("Guardia eliminado con exito")
    }
    catch(error)
    {
        return res.status(500).json({ error_deleteGuarda: error.message });
    }
}

module.exports = deleteGuardia