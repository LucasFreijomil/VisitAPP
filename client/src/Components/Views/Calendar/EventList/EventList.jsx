import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

export const EventList = ({selectedDate}) => {
    const { activeUser } = useSelector((state) => state )
    const [eventos, setEventos] = useState([])
    const parseDate = selectedDate.toISOString().slice(0, 10)
    const userEvents = activeUser.Events
    
    useEffect(()=> {
        const eventArr = []
        for(let i = 0; i < userEvents.length; i++){
            if(userEvents[i].date.slice(0, 10) === parseDate){
                eventArr.push(userEvents[i])
            }
        }
        setEventos(eventArr)

    }, [selectedDate])

    return(
        <div class="grid justify-items-center">
            <h2 class="m-5">Eventos del dia</h2>
            {eventos.length == 0 ? <div>No hay eventos</div> :
            eventos.map((event) => (
                <Link to={`/event/${event.id}`} class="w-3/4 border-2 border-red-600 mb-5 p-5">
                    <div >
                        <div>{event.title}</div>
                        {event.body.length>50 && <div> {event.body.slice(0,50) + ' . . .'} </div>}
                        {event.body.length<=50 && <div> {event.body} </div>}
                        <div>{event.date.slice(0, 10)}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}