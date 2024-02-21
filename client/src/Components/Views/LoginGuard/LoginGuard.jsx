import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { decodeGuard, logGuard } from "../../../Redux/actions/actions";

export const LoginGuard = () =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState(
        {
            username: '',
            password: ''
        }
    );

    const handleChange = e => {
		const {name, value} = e.target
		setForm(prevInput => ({...prevInput, [name]: value}))
	}

    const handleSubmit = e =>
    {
        e.preventDefault();
        if(form.username!='' && form.password!='')
        {
            logGuard(form)
            .then( (data) =>
            {
                console.log("Guard: ", data.token);
                window.localStorage.setItem('activeGuard', JSON.stringify(data.token));
                decodeGuard(data.token)
                .then( ( data ) =>
                {
                    console.log("DATA: ", data);
                    if(data.payload?.active)
                    {
                        dispatch(data);
                        navigate('/home');
                    }
                    else
                    {
                        alert('Guardia deshabilitado.');
                        setForm({
                            username: '',
                            password: ''
                        });
                    }
                })
                .catch( ( error ) =>
                {
                    console.log("ERROR en segunda promesa: ", error);
                })
            } )
            .catch( (error) =>
            {
                alert('¡Usuario incorrecto o inexistente!');
                console.log("Error: ", error);
            })
        }
        else
        {
            alert('¡Faltan datos!');
        }
    }
    
    return(
        <div>
            <button onClick={ () => console.log("FORM: ", form)}> FORM </button>
            <h1> GUARD LOGIN </h1>
            <form >

                <div>
                    <label>Usuario</label>
                    <input name='username' value={form.username} onChange={handleChange}/> <br/>
                </div>

                <div>
                    <label>Contraseña</label>
                    <input name='password' value={form.password} onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit}> Logear </button>
                <button type='button' onClick={
                    () => setForm({ username: '', password: '' })
                }> Limpiar </button>

            </form>
        </div>
    )
}