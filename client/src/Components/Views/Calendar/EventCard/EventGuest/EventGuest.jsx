import axios from "axios";
import { useSelector } from "react-redux";

export const EventGuest = ( { guest, thisUser } ) =>
{
  const activeGuard = useSelector( state => state.activeGuard );

  const handleCame = async () =>
  {
    const cameMessage = 
    {
      title: `Hola ${thisUser.name} ${thisUser.surname}, le informamos que ${guest.name} ${guest.surname} ha llegado!`,
      userId: thisUser.id
    }

    try {
      const { data } = await axios.post('http://localhost:3001/messages', cameMessage)
      alert(`${thisUser.name} avisado!`)
      console.log('Detalle de la notificación: ', data)
    } catch (error) {
      alert(`Error al dar aviso a ${thisUser.name}`)
      console.error(`Error al dar aviso a ${thisUser.name}`, error)
    }
  }

    return (
        <div style={{ display: 'flex', width: '50%' }}>
          <div style={{ width: '50%' }}>
            <img src={guest.imagen?guest.imagen:"https://w7.pngwing.com/pngs/443/556/png-transparent-computer-icons-symbol-business-card-format-miscellaneous-text-visiting-card-thumbnail.png"} alt={guest.nombre} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div style={{ width: '50%', textAlign: 'left' }}>
            <h3> Nombre: {guest.name}</h3>
            <h3> Apellido: {guest.surname}</h3>
            <p> DNI: {guest.dni}</p>
            {guest.work!='' && <p>Trabajo: {guest.work}</p>}
            {guest.company!='' && <p>Empresa: {guest.company}</p>}
            <button onClick={() => console.log(guest)}>Guest info</button>
            <br/>
            <hr/>
            <br/>
              <div>
                {activeGuard && <button onClick={handleCame}> LLegó ✔ </button>}
              </div>
          </div>
        </div>
      );
}