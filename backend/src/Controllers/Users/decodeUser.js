const jwt = require('jsonwebtoken');

const decodeUser = async(req, res) =>
{
     const { token } = req.query;
     try
     {
          const decodedToken = jwt.verify(token, process.env.SECRET);
          res.status(200).json( decodedToken );
     }
     catch(error)
     {
          res.status(500).json( { error_decodingToken: error.message } );
     }
}

module.exports = decodeUser;