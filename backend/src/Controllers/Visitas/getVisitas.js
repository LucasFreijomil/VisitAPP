const {Visitas, Events, Users} = require("../../db");

const getVisitas = async (req, res) =>
{
    const { id, company, work } = req.query;

    if(id)
    {
        try
        {
            const visitById = await Visitas.findByPk( id,
                {
                    include: [
                {
                    model: Users,
                    as: 'User',
                    attributes: ["id", "name", "surname"]
                },
                {
                    model: Events,
                    as: 'Events',
                    attributes: ["id", "title", "date", "startsAt", "endsAt", "body", "alarm"]
                }]} );
            res.status(200).json( visitById );
        }
        catch(error)
        {
            res.status(500).json( { error_getVisitById: error.message } );
        }
    }
    else
    {
        if(company)
        {
            try
            {
                const visitByCompany = await Visitas.findAll( { where: { company } } );
                res.status(200).json( visitByCompany );
            }
            catch(error)
            {
                res.status(500).json( { error_getVisitByCompany: error.message } );
            }
        }
        else
        {
            if(work)
            {
                try
                {
                    const visitByWork = await Visitas.findAll( { where: { work } } );
                    res.status(200).json( visitByWork );
                }
                catch(error)
                {
                    res.status(500).json( { error_getVisitByWork: error.message } );
                }
            }
            else
            {
                try
                {
                    const allVisitas = await Visitas.findAll();
                    return res.status(200).json(allVisitas);
                }
                catch (error)
                {
                    return res.status(500).json({ error_getVisitas: error.message });
                }
            }
        }
    }
}

module.exports = getVisitas;