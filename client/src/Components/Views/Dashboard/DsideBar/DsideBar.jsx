import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { handleFound } from '../../../../Redux/actions/actions';

export const DsideBar = ({setOption}) =>
{
    const dispatch = useDispatch();
    const [ pending, setPending ] = useState(false);
    let url ="http://localhost:3001/";

    useEffect( () =>
    {
        axios.get(`${url}users/notApproved`)
        .then( ( {data} ) =>
        {
            console.log("DATA: ", data, "\n LENGTH: ", data.length);
            data.length!=0 && setPending(data.length)
            data.length==0 && setPending(false);
        })
        .catch( (error) =>
        {
            setPending(false);
        })
    }, [])



    console.log("Pending: ", pending);
    return(
        <div>
            <button onClick={ () => setOption('main')}> INICIO </button>
            | | 
            <button onClick={ () => setOption('pending')}> {pending && `(${pending})`} PENDIENTES </button>
            | | 
            <button onClick={ () => { setOption('users'); handleFound( dispatch, false ) }}> USUARIOS </button>
            | | 
            <button onClick={ () => setOption('createGuard')}> CREAR GUARDIA </button>
            | | 
            <button onClick={ () => setOption('guards')}> GUARDIAS </button>
        </div>
    )
}