import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logUser } from "../../../Redux/actions/actions";

export const Login = () =>
{
    const dispatch = useDispatch();
    const [form, setForm] = useState(
        {
            user: '',
            pass: ''
        }
    );

    const handleChange = e => {
		const {name, value} = e.target
		setForm(prevInput => ({...prevInput, [name]: value}))
	}

    const handleSubmit = e =>
    {
        e.preventDefault();
        if(form.user!='' && form.pass!='')
        {
            logUser(form)
            .then( (data) =>
            {
                console.log("User: ", data);
            } )
            .catch( (error) =>
            {
                console.log("Error: ", error);
            })
            // if(user)
            // {
            //     console.log("USER: ", user);
            //     console.log("DECODED USER: ", decodeUser(user));
                // if(user.isApproved==true)
                // {
                //     window.localStorage.setItem( 'activeUser', JSON.stringify( user.id ) );
                //     dispatch(user.id);
                // }
                // else
                // {
                //     alert('¡Usuario bloqueado! Comuníquese con atención al cliente.');
                //     setForm({ user: '', pass: '' });
                // }
            // }
            // else
            // {
            //     alert('¡Usuario/Contraseña incorrecto!');
            // }
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
                    <input name='user' value={form.user} onChange={handleChange}/> <br/>
                </div>

                <div>
                    <label>Contraseña</label>
                    <input name='pass' value={form.pass} onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit}> Logear </button>
                <button type='button' onClick={
                    () => setForm({ user: '', pass: '' })
                }> Limpiar </button>

            </form>
        </div>
    )
}