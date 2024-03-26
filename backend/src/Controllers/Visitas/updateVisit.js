const { Visitas, Users } = require('../../db.js');

const updateVisit = async ( req, res ) =>
{
    const form = req.body;
    const { id, dni } = req.query;

    if (id) 
    {
        try {
            const thisUser = await Users.findByPk( id )
            const thisVisit = await Visitas.findByPk( dni )
            await thisUser.addVisita(thisVisit)
            res.status(200).json({succes: 'Visit linked succesfully'})
        } catch (error) {
            return res.status(500).json({ error_link_visit_user: error.message });
        }
    } else
    {
        try 
        {
            const updatedVisit = await Visitas.update(form, { where: { dni } });
            return res.status(200).json({ updatedVisit: updatedVisit });
        } catch (error) {
            return res.status(500).json({ error_updateVisit: error.message });
        }
    }
}

module.exports = updateVisit;