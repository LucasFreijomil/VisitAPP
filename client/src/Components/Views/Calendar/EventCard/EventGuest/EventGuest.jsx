export const EventGuest = ( {guest} ) =>
{

    return (
        <div style={{ display: 'flex', width: '50%' }}>
          <div style={{ width: '50%' }}>
            <img src={guest.imagen?guest.imagen:"https://w7.pngwing.com/pngs/443/556/png-transparent-computer-icons-symbol-business-card-format-miscellaneous-text-visiting-card-thumbnail.png"} alt={guest.nombre} style={{ width: '100%', height: 'auto' }} />
          </div>
          <div style={{ width: '50%', textAlign: 'left' }}>
            <h3>Nombre: {guest.name}</h3>
            <h3>Apellido: {guest.surname}</h3>
            <p>DNI: {guest.dni}</p>
            {guest.work!='' && <p>Trabajo: {guest.work}</p>}
            {guest.company!='' && <p>Empresa: {guest.company}</p>}
            <button onClick={() => console.log(guest)}>Guest info</button>
          </div>
        </div>
      );
}