import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { handleFound } from "../../Redux/actions/actions";

export const SearchBar = ( { option } ) =>
{
    let url = option=='pending' ? "http://localhost:3001/users/notApproved" : "http://localhost:3001/users";
    const location = useLocation();
    const navigate = useNavigate();
    const foundBySearch = useSelector( state => state.foundBySearch );
    const [ inputName, setInputName ] = useState('');
    const [ inputEmail, setInputEmail ] = useState('');
    const [ inputDni, setInputDni ] = useState('');
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams();
    const searchParams = new URLSearchParams(location.search);

    useEffect( () =>
    {
        let name = searchParams.get('name');
        let surname = searchParams.get('surname');
        let email = searchParams.get('email');
        let dni = searchParams.get('dni');
        
        if(name && surname)
        {
            axios.get(`${url}?name=${name}&surname=${surname}`)
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
                axios.get(`${url}?name=${name}`)
                .then( ( { data } ) =>
                {
                    if(data.length>0)
                    {
                        if(option!='pending')
                        {
                            let approved = [];
                            data.map( x => x.isApproved && approved.push(x) );
                            approved.length>0 ? handleFound( dispatch, approved ) : handleFound( dispatch, 404 );
                        }
                        else
                        {
                            handleFound( dispatch, data );
                        }
                    }
                    else
                    {
                        handleFound(dispatch, 404);
                    }
                })
                .catch( ( error ) =>
                {
                    console.log( "Error buscando por nombre: ", error );
                })
            }
            else
            {
                if(email)
                {
                    axios.get(`${url}?email=${email}`)
                    .then( ( { data } ) =>
                    {
                        if(option=='pending')
                        {
                            data!=null ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
                        }
                        else
                        {
                            ( data!=null && data.isApproved ) ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
                        }
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
                        axios.get(`${url}?dni=${dni}`)
                        .then( ( { data } ) =>
                        {
                            if(option=='pending')
                            {
                                data!=null ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
                            }
                            else
                            {
                                ( data!=null && data.isApproved ) ? handleFound( dispatch, data ) : handleFound(dispatch, 404);
                            }
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

    const handleCleanUp = () =>
    {
        handleFound(dispatch, false);
        setInputDni('');
        setInputEmail('');
        setInputName('');
        navigate(window.location.pathname)
    }

    const handleEnterName = (e) =>
    {
        if(e.key=='Enter')
        {
            if(e.target.value != '')
            {
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
                setInputName('');
                handleFound(dispatch, false);
                navigate(window.location.pathname)
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
                setInputEmail('');
                handleFound(dispatch, false);
                navigate(window.location.pathname)
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
                setInputDni('');
                handleFound(dispatch, false);
                navigate(window.location.pathname)
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
            <label> Nombre: </label>
            <input value={inputName} onChange={(e) => setInputName(e.target.value) } placeholder="JHON DOE" onKeyDown={handleEnterName}/>
            <label> Correo: </label>
            <input value={inputEmail} onChange={(e) => setInputEmail(e.target.value) } placeholder="JHON@DOE.COM" onKeyDown={handleEnterMail}/>
            <label> DNI: </label>
            <input value={inputDni} onChange={ (e)=> setInputDni(e.target.value) } placeholder="1234567890" onKeyDown={handleEnterDni} maxLength={8}  type='number' />
            {foundBySearch!=false && <button onClick={handleCleanUp}> ( Limpiar búsqueda ) </button>}
            <br/>
            <hr/>
            <button onClick={handleGoBack}> BACK BACK </button>
        </div>
    )
}