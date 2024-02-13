import axios from 'axios';
import { useEffect, useState } from 'react';
import { DPendingCard } from '../DPendingCard/DPendingCard';
import Styles from './DPending.module.css';

export const DPending = ({setUDetail, setOption}) =>
{
    const [ pending, setPending ] = useState([]);
    let url = "http://localhost:3001/";

    useEffect( () =>
    {
        axios.get(`${url}users/notApproved`)
        .then( ( {data} ) =>
        {
            setPending(data);
        })
        .catch( (error) =>
        {
            console.log( "Error al cargar / No hay pendientes: ", error.message );
        })
    }, [])

    return(
        <div className={Styles.toApproveContainer}>
            <button onClick={() => console.log("PENDING: ", pending)}> pendientes </button>
            {pending.length>0 && (
                pending.map( (x, y) =>
                    <DPendingCard key={y} x={x} setUDetail={setUDetail} setOption={setOption}/>
                )
            )}

            {
                pending.length==0 && (
                    <p> No hay usuarios pendientes de aprobación ♪ </p>
            )}
        </div>
    )
}