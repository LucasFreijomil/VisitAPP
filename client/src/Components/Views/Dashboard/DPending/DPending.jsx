import axios from 'axios';
import { useEffect, useState } from 'react';
import { DPendingCard } from '../DPendingCard/DPendingCard';
import Styles from './DPending.module.css';

export const DPending = () =>
{
    const [ pending, setPending ] = useState([]);

    useEffect( () =>
    {
        let url = "localhost:3001/";
        axios.get(`${url}users/notApproved`)
        .then( ( {data} ) =>
        {
            setPending(data);
        })
        .catch( (error) =>
        {
            console.log( "Error al cargar pendientes: ", error.message );
        })
    }, [])

    return(
        <div className={Styles.toApproveContainer}>
            {pending.length>0 && (
                pending.map( (x, y) =>
                {
                    let thisUser = JSON.parse( x );
                    <DPendingCard thisUser={thisUser} />
                })
            )}
            <p> No hay usuarios pendientes de aprobación ♪ </p>
        </div>
    )
}