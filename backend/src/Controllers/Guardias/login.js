const { Guardias } = require("../../db.js");
const jwt = require("jsonwebtoken");

const login = async(req, res) =>
{
    const { username, password } = req.body;

    try
    {
        if( !username || !password ) return res.status(400).send("Missing data");

        const thisGuard = await Guardias.findOne( { where: {username} } );

        if(thisGuard.active==false)
        {
            return res.status(400).json( { notApproved: `${user.username} has been disabled.` } );
        }
        else
        {
            if( thisGuard.password != password )
            {
                return res.status(400).send("Contraseña incorrecta")
            }
            else
            {
                const guardToken = thisGuard.dataValues;

                const token = jwt.sign(guardToken, process.env.SECRET);
                return res.status(200).send( {token} );
            }
        }
    }
    catch(error)
    {
        return res.status(400).json( { error_loginGuard: error.message } );
    }
}

module.exports = login;