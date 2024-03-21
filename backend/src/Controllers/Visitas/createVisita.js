const { Visitas, Users } = require("../../db.js");

const createVisita = async (req, res) =>
{
    const { name, surname, dni, img, userId } = req.body
    let image = img ? img : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
    
    try
    {
        const alreadyExisting = await Visitas.findByPk( dni );
        alreadyExisting && res.status(200).json( { alreadyExisting: `Visit DNI ${dni} already exists.` } );

        const nuevaVisita =
        {
            name, surname, dni, image
        };

        const visita = await Visitas.create(nuevaVisita);
        const thisUser = await Users.findByPk( userId );
        thisUser.addVisitas( visita.id );

        return res.status(201).json( visita );
    }
    catch(error)
    {
        return res.status(500).json({error_createVisitas: error.message})
    }
}

module.exports = createVisita;