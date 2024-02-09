const { Users } = require("../../db.js");

const approvedUsers = async(req, res) => {
   try
   {
     const notApproved = await Users.findAll( { where: {isApproved: false} } );
     return res.status(200).json(notApproved)
   }
   catch(error)
   {
     return res.status(500).json( { error_approvedUsers: error.message } );
   }
}

module.exports = approvedUsers;