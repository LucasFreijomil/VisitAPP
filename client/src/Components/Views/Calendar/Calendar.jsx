import { useState } from "react";
import Calendar from 'react-calendar';
import '../Calendar/Calendar.css';
import { CreateEvent } from "./CreateEvent/CreateEvent.jsx";

export const Calendario = () =>
{
    const [ selectedDate, setSelectedDate ] = useState( new Date() );

    const handleDateChange = (date) =>
    {
        setSelectedDate( date );
    }

    return(
        <div>
            <button onClick={() => console.log("Date: ", selectedDate)}> Date </button>
            <h1> Calendario de visitas </h1>
            <Calendar onChange={handleDateChange} value={selectedDate}/>
            <br/>
            <hr/>
            <br/>
            <CreateEvent selectedDate={selectedDate} />
        </div>
    )
}