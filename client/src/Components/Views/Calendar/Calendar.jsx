import { useState } from "react";
import Calendar from 'react-calendar';
import { useSelector } from "react-redux";
import '../Calendar/Calendar.css';
import { CreateEvent } from "./CreateEvent/CreateEvent.jsx";
import { EventList } from "./EventList/EventList.jsx";
import styles from "./Calendar.module.css"

export const Calendario = () =>
{
    const { activeUser } = useSelector((state) => state )
    const [ selectedDate, setSelectedDate ] = useState( new Date() );

    const userEvents = activeUser.Events

    // Función para verificar si un día tiene eventos
    const hasEvents = (date) => {
        const eventDates = userEvents.map(event => new Date(event.date).toDateString()); // Obtener un array con las fechas de los eventos en formato de día
        const selectedDate = date.toDateString(); // Convertir la fecha seleccionada a formato de día

        return eventDates.includes(selectedDate); // Devuelve true si la fecha seleccionada tiene eventos, de lo contrario devuelve false
    }

    // Función para personalizar el contenido de las celdas del calendario
    const tileContent = ({ date, view }) => {
        if (view === 'month' && hasEvents(date)) {
            return <div style={{ backgroundColor: 'red', borderRadius: '50%', width: '25px', height: '25px' }}></div>;
        }
    }

    const handleDateChange = (date) =>
    {
        setSelectedDate( date );
        console.log(userEvents);
    }

    return(
        <div>
            <button onClick={() => console.log("Date: ", selectedDate)}> Date </button>
            <h1> Calendario de visitas </h1>
            <Calendar onChange={handleDateChange} value={selectedDate} tileContent={tileContent}/>
            <br/>
            <hr/>
            <br/>
            <div className={styles.container}>
            <div className={styles.create}><CreateEvent selectedDate={selectedDate} /></div>
            <div className={styles.list}><EventList selectedDate={selectedDate} /></div>
            </div>
        </div>
    )
}