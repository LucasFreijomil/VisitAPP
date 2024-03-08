import axios from 'axios';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { handleFound } from "../../Redux/actions/actions";

export const SearchBar = () =>
{
    let url = "http://localhost:3001/";
    const location = useLocation();
    const navigate = useNavigate();
    const { foundBySearch } = useSelector( state => state );
    const dispatch = useDispatch();

    useEffect( () =>
    {
        const searchParams = new URLSearchParams(location.search);
        const name = searchParams.get('name');
        const surname = searchParams.get('surname');
        const email = searchParams.get('email');
        const dni = searchParams.get('dni');

        if(name && surname)
        {
            axios.get(`${url}users?name=${name}&surname=${surname}`)
            .then( ( { data } ) =>
            {
                data.length>0 ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
            })
            .catch( ( error ) =>
            {
                console.log( "Error buscando por nombre y apellido: ", error.message );
            })
        }
        else
        {
            if(name)
            {
                axios.get(`${url}users?name=${name}`)
                .then( ( { data } ) =>
                {
                    data.length>0 ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
                })
                .catch( ( error ) =>
                {
                    console.log( "Error buscando por nombre: ", error.message );
                })
            }
            else
            {
                if(email)
                {
                    axios.get(`${url}users?email=${email}`)
                    .then( ( { data } ) =>
                    {
                        data!=null?handleFound( dispatch, data ) : handleFound(dispatch, 404);
                    })
                    .catch( ( error ) =>
                    {
                        console.log( "Error buscando por email: ", error.message );
                    })
                }
                else
                {
                    if(dni)
                    {
                        axios.get(`${url}users?dni=${dni}`)
                        .then( ( { data } ) =>
                        {
                            data!=null ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
                        })
                        .catch( ( error ) =>
                        {
                            console.log( "Error buscando por dni: ", error.message );
                        })
                    }
                }
            }
        }
    }, [location.search]);

    const handleGoBack = () =>
    {
        window.history.back();
    }

    const handleEnterName = (e) =>
    {
        if(e.key=='Enter')
        {
            if(e.target.value != '')
            {
                let urlParams = new URLSearchParams();
                let input = e.target.value;
                let splitted = input.split(' ');
                if(splitted.length>1)
                {
                    urlParams.set('name', splitted[0]);
                    urlParams.set('surname', splitted[1]);
                    navigate(window.location.pathname + '?' + urlParams.toString());
                }
                else
                {
                    urlParams.set('name', input);
                    window.history.replaceState({}, '', window.location.pathname + '?' + urlParams.toString());
                    navigate(window.location.pathname + '?' + urlParams.toString());
                }
            }
            else
            {
                handleFound(dispatch, false);
            }
        }
        else
        {
            if(e.key=='Escape')
            {
                e.target.value='';
                handleFound(dispatch, false);
            }
            else
            {
                //No hacer nada.
            }
        }
    }

    const handleEnterMail = (e) =>
    {
        if(e.key=='Enter')
        {
            if(e.target.value != '')
            {
                let urlParams = new URLSearchParams();
                urlParams.set('email', e.target.value);
                window.history.replaceState({}, '', window.location.pathname + '?' + urlParams.toString());
                navigate(window.location.pathname + '?' + urlParams.toString())
            }
            else
            {
                handleFound(dispatch, false);
            }
        }
        else
        {
            if(e.key=='Escape')
            {
                e.target.value='';
                handleFound(dispatch, false);
            }
            else
            {
                //No hacer nada.
            }
        }
    }

    const handleEnterDni = (e) =>
    {
        if(e.key=='Enter')
        {
            if(e.target.value != '')
            {
                let urlParams = new URLSearchParams();
                urlParams.set('email', e.target.value);
                window.history.replaceState({}, '', window.location.pathname + '?' + urlParams.toString());
                navigate(window.location.pathname + '?' + urlParams.toString())
            }
            else
            {
                handleFound(dispatch, false);
            }
        }
        else
        {
            if(e.key=='Escape')
            {
                e.target.value='';
                handleFound(dispatch, false);
            }
            else
            {

            }
        }
    }

    return(
        <div>
            <br/>
            <hr/>
            <br/>
            <button onClick={()=>console.log("foundBySearch: ", foundBySearch?foundBySearch:'false')}>| NAME |</button>
            <label> Nombre: </label> <input placeholder="JHON DOE" onKeyDown={handleEnterName}/>
            <label> Correo: </label> <input placeholder="JHON@DOE.COM" onKeyDown={handleEnterMail}/>
            <label> DNI: </label> <input maxLength={8} type='number' placeholder="1234567890" onKeyDown={handleEnterDni}/>
            {foundBySearch!=false && <button onClick={()=>handleFound(dispatch, false)}> ( Limpiar búsqueda ) </button>}
            <br/>
            <hr/>
            <button onClick={handleGoBack}> BACK BACK </button>
        </div>
    )
}