const { Users } = require("../../db.js");

const approveUser = async (req, res) =>
{
    const { id } = req.params
    const { disapprove } = req.body;

    if(disapprove)
    {
        try
        {
            await Users.update( {isApproved: false}, {where: { id } } );
            return res.status(200).json("Usuario desaprobado.");
        }
        catch(error)
        {
            return res.status(500).json( { error_dissaproveUser: error } );
        }
    }
    else
    {
        try
        {
            await Users.update( {isApproved: true}, { where: { id } } );
            return res.status(200).json("Usuario aprovado.")
        }
        catch (error)
        {
            return res.status(500).json( { error_approveUser: error.message } );
        }
    }

}

module.exports = approveUser;