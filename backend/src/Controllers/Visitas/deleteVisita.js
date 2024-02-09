const deleteVisita = async(req, res) =>
{
    const {id} = req.params

    try
    {
        await visita.destroy( { where: { id } } );
        res.status(200).json( { Success: `User id ${id} deleted` } );
    }
    catch(error)
    {
        return res.status(500).json(error.message);
    }
}

module.exports =  deleteVisita;