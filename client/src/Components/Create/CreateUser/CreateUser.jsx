import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../Redux/actions/actions";

export const CreateUser = () =>
{
    const navigate = useNavigate()
    const [ preImage, setPreImage ] = useState('');
    const [ images, setImages ] = useState([]);
    const [ message, setMessage ] = useState(false);
    const [input, setInput] = useState(
        {
            username: '',
            password: '',
            passwordRep: '',
            email: '',
            name: '',
            surname: '',
            reviewImages: [],
            secQ: '',
            secA: ''
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
        if(input.username !='' && input.password !='' && input.passwordRep !='' && input.email !='' && input.name !=''
        && input.surname !='' && input.secQ !='' && input.secA !='')
        {
            if(images.length>=3)
            {
                input.reviewImages = images;
            }
            else
            {
                alert('¡Faltan imagenes!');
                return ;
            }

            if(createUser(input))
            {
                alert('¡Usuario creado correctamente!');
                setMessage('Recuerde: Su usuario debe ser aprobado antes que pueda acceder a la cuenta que acaba de crear.')
                setInput( {
                    username: '',
                    password: '',
                    passwordRep: '',
                    email: '',
                    name: '',
                    surname: '',
                    reviewImages: [],
                    secQ: '',
                    secA: ''
                    })
                setImages([]);
            }
            else
            {
                alert('¡Error al crear el usuario!');
            }
        }
        else
        {
            alert('¡Faltan datos!');
        }
    }

    const addImage = () =>
    {
        setImages( [ ...images, preImage ] );
        setPreImage('');
    }

    const handleRedirect = () =>
    {
        navigate("/home")
    }

    return(
        <div className="flex justify-center bg-gray-600">

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
                        <p> Repita la constraseña </p>
                        <input type="password" name="passwordRep" value={input.passwordRep} onChange={handleChange} />
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

                    <div>
                        <span> Imagenes(3) </span>
                        <br />
                        <input name='reviewImages' value={preImage} onChange={(e) => setPreImage(e.target.value)} />
                        <button type="button" onClick={addImage}>Agregar imagenes...</button>
                        <button type='button' onClick={() => console.log("image so far: ", images) }> imagenes so far</button>
                        <br />
                        {images.map( (x,y) => <button type='button' key={y} onClick={ () => setImages( images.filter( img => img!==x ) ) }> [ {x} ] </button> )  }
                    </div>
                    <br />

                    <div>
                        <p> Pregunta de seguridad </p>
                        <input type="text" name="secQ" value={input.secQ} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p> Respuesta de seguridad </p>
                        <input type="text" name="secA" value={input.secA} onChange={handleChange} />
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