const { Events } = require('../../db.js');

const getEvents = async ( req, res) =>
{
    res.status(200).json({cool: 'soy el getEvents'});
}

module.exports = getEvents;