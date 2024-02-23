export const GSideBar = ({setOption}) =>
{

    return(
        <div>
            | |
            <button onClick={ () => setOption('main')}> INICIO </button>
            | |
            <button onClick={ () => setOption('users')}> USUARIOS </button>
            | |
        </div>
    )
}