const { Users } = require("../../db.js");
const jwt = require("jsonwebtoken");

const login = async(req, res) =>
{
    const { username, password } = req.body;

    try
    {
        if( !username || !password ) return res.status(400).send("Missing data");

        const user = await Users.findOne( { where: {username} } )

        if(user.isActive==false)
        {
            return res.status(400).json( { notApproved: `${user.username} hasn't been approved yet.` } );
        }
        else
        {
            if( user.password != password )
            {
                return res.status(400).send("Contraseña incorrecta")
            }
            else
            {
                const userToken = user.dataValues;

                const token = jwt.sign(userToken, process.env.SECRET);
                return res.status(200).send( {token} );
            }
        }
    }
    catch(error)
    {
        return res.status(400).json( { error_login: error.message } );
    }
}

module.exports = login;