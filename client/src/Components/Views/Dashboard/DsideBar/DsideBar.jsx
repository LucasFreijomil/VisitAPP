export const DsideBar = ({setOption}) =>
{

    return(
        <div>
            <button onClick={ () => setOption('main')}> INICIO </button>
            <button onClick={ () => setOption('pending')}> PENDIENTES </button>
            <button onClick={ () => setOption('users')}> USUARIOS </button>
        </div>
    )
}