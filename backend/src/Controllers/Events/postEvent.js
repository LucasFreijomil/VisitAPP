const { Events } = require('../../db.js');

const postEvent = async ( req, res) =>
{
    res.status(200).json({cool: 'soy el postEvent'});
}

module.exports = postEvent;