const { Guardias } = require('../../db.js');

const switchGuard = async (req, res) =>
{
    const { id } = req.params;

    try
    {
        const thisGuard = await Guardias.findByPk( id );
        await Guardias.update( { active: !thisGuard.active }, { where: { id } });
        res.status(200).json( {success: `Guard "${thisGuard.name}" succesfully swapped.`});
    }
    catch(error)
    {
        res.status(500).json({ error_switchGuard: error.message });
    }
}

module.exports = switchGuard;