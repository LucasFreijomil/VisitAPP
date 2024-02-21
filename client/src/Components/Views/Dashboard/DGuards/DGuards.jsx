import axios from 'axios';
import { useEffect, useState } from 'react';
import { DGuardCard } from '../DGuardCard/DGuardCard.jsx';
import Styles from './DGuards.module.css';

export const DGuards = ({ setGDetail, setOption }) =>
{
    const [ guards, setGuards ] = useState([]);
    let url = "http://localhost:3001/";

    useEffect( () =>
    {
        axios.get(`${url}guards`)
        .then( ( {data} ) =>
        {
            setGuards(data);
        })
        .catch( (error) =>
        {
            console.log( "Error al cargar / No hay guardias para mostrar: ", error.message );
        })
    }, [])

    return(
            <div className={Styles.toApproveContainer}>
                    {guards.length>0 && (
                        guards.map( (x, y) =>
                            <DGuardCard key={y} x={x} setGDetail={setGDetail} setOption={setOption}/>
                        )
                    )}
        
                    {
                        guards.length==0 && (
                            <p> No hay guardias cargados en la base de datos. </p>
                    )}
            </div> )
}