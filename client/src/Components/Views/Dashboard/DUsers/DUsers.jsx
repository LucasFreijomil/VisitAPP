import axios from 'axios';
import { useEffect, useState } from "react";
import { DUserCard } from '../DUserCard/DUserCard.jsx';
import Styles from './DUsers.module.css';

export const DUsers = () =>
{
    const [ users, setUsers ] = useState([]);

    useEffect( () =>
    {
        let url = "localhost:3001/";
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
                {
                    let thisUser = JSON.parse( x );
                    <DUserCard thisUser={thisUser} />
                })
            )}
            <p> No hay usuarios para mostrar </p>
        </div>
    )
}