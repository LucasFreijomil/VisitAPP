import axios from 'axios';
import { useEffect, useState } from "react";
import { DUserCard } from '../DUserCard/DUserCard.jsx';
import Styles from './DUsers.module.css';

export const DUsers = () =>
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
            <button onClick={() => console.log("users: ", users)}> users </button>
            {users.length>0 && (
                users.map( (x, y) =>
                
                    <DUserCard key={y} x={x} />
                )
            )}
            <p> No hay usuarios para mostrar </p>
        </div>
    )
}