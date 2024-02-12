import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { decodeUser, logUser } from "../../../Redux/actions/actions";

export const Login = () =>
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
            // logUser(form)
            // .then( ( data ) =>
            // {
            //     console.log("DATA: ", data);
            // })
            // .catch( (error) =>
            // {
            //     console.log("ERROR: ", error);
            // })
            logUser(form)
            .then( (data) =>
            {
                console.log("User: ", data.token);
                window.localStorage.setItem('activeUser', JSON.stringify(data.token));
                decodeUser(data.token)
                .then( ( data ) =>
                {
                    console.log("DATA: ", data);
                    if(data.payload?.isApproved)
                    {
                        dispatch(data);
                        navigate('/home');
                    }
                    else
                    {
                        alert('¡Usuario aún no aprobado!');
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