import axios from 'axios';
import { useEffect, useState } from "react";
import { DUserCard } from '../DUserCard/DUserCard.jsx';
import Styles from './DUsers.module.css';

export const DUsers = ( { setUDetail, setOption }) =>
{
    const [ users, setUsers ] = useState([]);

    useEffect( () =>
    {
        let url = "http://localhost:3001/";
        axios.get(`${url}users`)
        .then( ( {data} ) =>
        {
            setUsers(data);
        })
        .catch( (error) =>
        {
            console.log( "Error al cargar pendientes: ", error.message );
        })
    }, [])

    return(
        <div className={Styles.usersContainer}>
            {users.length>0 && (
                users.map( (x, y) =>
                
                    <DUserCard key={y} x={x} setUDetail={setUDetail} setOption={setOption}/>
                )
            )}
            {users.length==0 && <p> No hay usuarios para mostrar </p>}
        </div>
    )
}