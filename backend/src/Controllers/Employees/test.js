const test = async ( req, res ) =>
{
    const stuff = req.body;

    stuff && res.status(200).json( stuff.sergio ? stuff.sergio : 'No hay sergio' );
    !stuff && res.status(500).json( { error: 'no stuff' } );

}

module.exports = test;