import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router";
import { handleFound, pendingToApprove } from '../../../../Redux/actions/actions';

export const DsideBar = ({setOption}) =>
{
    const dispatch = useDispatch();
    const { toApprove } = useSelector( state => state );
    const [ pending, setPending ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let url ="http://localhost:3001/";

    useEffect( () =>
    {
        const refreshToApprove = async () =>
        {
            await pendingToApprove(dispatch);
            toApprove   ? toApprove.length>0 ? setPending( toApprove.length ) : setPending(false)
                : false;
        }
        refreshToApprove();
    }, [])

    useEffect( () =>
    {
        toApprove ? toApprove.length>0 ? setPending( toApprove.length ) : setPending(false)
        : false;
    }, [ toApprove ])

    return(
        <div>
            <button onClick={ () => setOption('main')}> INICIO </button>
            | |
            <button onClick={ () => { setOption('pending'); navigate(location.pathname); handleFound(dispatch, false); }}> {pending && `(${pending})`} PENDIENTES </button>
            | |
            <button onClick={ () => { setOption('users'); navigate(location.pathname); handleFound( dispatch, false ); }}> USUARIOS </button>
            | |
            <button onClick={ () => setOption('createGuard') }> CREAR GUARDIA </button>
            | |
            <button onClick={ () => setOption('guards')}> GUARDIAS </button>
        </div>
    )
}