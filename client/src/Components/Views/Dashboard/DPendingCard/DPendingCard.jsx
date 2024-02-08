export const DPendingCard = ( {thisUser} ) =>
{

    return(
        <div>
            <button onClick={() => console.log("USER DATA: ", thisUser ) }> user data </button>
        </div>
    )
}