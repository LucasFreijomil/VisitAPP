import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { SearchBar } from '../../../SearchBar/SearchBar.jsx';
import { DUserCard } from '../DUserCard/DUserCard.jsx';
import { DUserDetail } from '../DUserDetail/DUserDetail.jsx';
import Styles from './DUsers.module.css';

export const DUsers = () =>
{
    const [ users, setUsers ] = useState([]);
    const { foundBySearch } = useSelector( state => state );
    const [ id, setId ] = useState(false);
    const location = useLocation();

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

    useEffect( () =>
    {
        const searchParams = new URLSearchParams(location.search);
        setId(searchParams.get('id'));
    }, [ location.search ])

    return(
        <div>
            
            {!id && (
                <div>
                    <button onClick={() => console.log("Users: ", users)}> USERS </button>
                    <SearchBar />

                    { (foundBySearch && foundBySearch!='404' && Array.isArray(foundBySearch) ) && (<div className={Styles.usersContainer}>
                        {
                            foundBySearch.map( (x, y) =>
                            
                                <DUserCard key={y} x={x}/>
                            )
                        }
                        {users.length==0 && <p> No hay usuarios para mostrar </p>}
                    </div>) }

                    { (foundBySearch && foundBySearch!='404' && !Array.isArray(foundBySearch) ) && (<div className={Styles.usersContainer}>
                        {
                            <DUserCard x={foundBySearch}/>
                        }
                        {users.length==0 && <p> No hay usuarios para mostrar </p>}
                    </div>) }

                    { foundBySearch=='404' && (<div className={Styles.usersContainer}>
                        {
                            <div>
                                No se encontraron coincidencias con la búsqueda...
                            </div>
                        }
                        {users.length==0 && <p> No hay usuarios para mostrar </p>}
                    </div>) }

                    {!foundBySearch && (
                    <div className={Styles.usersContainer}>
                        {users.length>0 && (
                            users.map( (x, y) =>
                            
                                <DUserCard key={y} x={x}/>
                            )
                        )}
                        {users.length==0 && <p> No hay usuarios para mostrar </p>}
                    </div>)}
                </div>)
            }

            {id && (
                <DUserDetail />
            )}
        </div>
    )
}