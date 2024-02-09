import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateUser = () =>
{
    const [input, setInput] = useState()
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate("/home")
    }
    return(
        <div className="flex justify-center bg-gray-600">
            <br />
            <form className="relative bg-white px-6 pt-10 pb-6 shadow-xl ring-gray-600/5 sm:max-w-lg sm:rounded-lg sm:px-10">
                    <button onClick={handleRedirect}>Volver</button>
                <br />
                <span>*Obligatorio</span>
                
                <fieldset>
                    <div>
                        
                    <p>Usuario*</p>
                    <input
                    type="text"
                    name="username"
                    value={input}
                    />
                    
                    </div>
                    <br />

                    <div>
                    <p>Contraseña*</p>
                    <input
                    type="password"
                    name="password"
                    value={input}
                    />
                    </div>
                    <br />

                    <p>Repita la constraseña*</p>
                    <input 
                    type="password"
                    name="passwordRep"
                    value={input}
                    />
                    <br />
                    <div>
                    <br />
                    <p>Nombre*</p>

                    <input 
                    type="text"
                    name="email"
                    value={input}
                    />
                    </div>
                    <div>
                    <br />
                    <p>Apellido*</p>

                    <input 
                    type="text"
                    name="email"
                    value={input}
                    />
                    </div>
                    <span>Imagenes(3)</span>
                    <br />
                    <button>Agregar imagenes...</button>
                    <br />
                    <br />
                    <label>
                    <input type="checkbox" id="cbox1" name="term"   />
                    Acepto los términos y condiciones.
                    </label>
                    <br />
                    <br />
                    <div>
                    <button
                    type="submit"
                    >Registrarse
                    </button>
                    <br />
                    </div>
                </fieldset>
            </form>
            <br />
            <hr />
        </div>
    )
};