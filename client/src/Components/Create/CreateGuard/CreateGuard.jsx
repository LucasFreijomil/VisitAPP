import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGuard } from "../../../Redux/actions/actions";

export const CreateGuard = () =>
{
    const navigate = useNavigate()
    const [ message, setMessage ] = useState(false);
    const [input, setInput] = useState(
        {
            username: '',
            password: '',
            email: '',
            name: '',
            surname: '',
        }
    )

    const handleChange = e =>
    {
		const {name, value} = e.target;
		setInput(prevInput => ({...prevInput, [name]: value}));
	}

    const handleSubmit = e =>
    {
        e.preventDefault();
        if(input.username !='' && input.password !='' && input.email !='' && input.name !=''
        && input.surname !='')
        {

            if(createGuard(input))
            {
                alert('Guardia creado correctamente!');
                setMessage('Para administrar guardias existentes, dirígase a la sección "Guardias" desde el panel de administrador.');
                setInput( {
                    username: '',
                    password: '',
                    email: '',
                    name: '',
                    surname: ''
                    })
            }
            else
            {
                alert('¡Error al crear el guardia!');
            }
        }
        else
        {
            alert('¡Faltan datos!');
        }
    }

    const handleRedirect = () =>
    {
        navigate("/home")
    }

    return(
        <div className="flex justify-center bg-gray-600">
            CREATE A GUARD

            {message &&
            <div>
                { message }<button onClick={ () => setMessage(false) }> X </button>
            </div>
            }
            <br />
            
            <form className="relative bg-brown px-6 pt-10 pb-6 shadow-xl ring-gray-600/5 sm:max-w-lg sm:rounded-lg sm:px-10">
                    <button type='button' onClick={handleRedirect}>Volver</button>
                <br />
                
                <fieldset>
                    <div>
                        
                        <p>Usuario</p>
                        <input type="text" name="username" value={input.username} onChange={handleChange} />
                    
                    </div>
                    <br />

                    <div>
                        <p>Contraseña</p>
                        <input type="password" name="password" value={input.password} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p> Correo electrónico:</p>
                        <input type="text" name="email" value={input.email} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p> Nombre </p>
                        <input type="text" name="name" value={input.name} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p> Apellido </p>
                        <input type="text" name="surname" value={input.surname} onChange={handleChange} />
                    </div>
                    <br />

                    <label>
                    <input type="checkbox" id="cbox1" name="term"   />
                    Acepto los términos y condiciones.
                    </label>
                    <br />
                    
                    <div>
                        <button type="button" onClick={() => console.log("Input: ", input)}> Show FORM </button>
                        <button type="submit" onClick={ handleSubmit } > Registrarse </button>
                    </div>
                    <br />

                </fieldset>
            </form>
            <br />
            <hr />
        </div>
    )
};