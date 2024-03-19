import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

export const EventList = ({ selectedDate, setSelectedEvent, thisUser}) => {
    const activeUser = useSelector((state) => state.activeUser );
    const activeGuard = useSelector( state => state.activeGuard );
    const [eventos, setEventos] = useState([])
    const parseDate = selectedDate.toISOString().slice(0, 10)
    const userEvents = activeUser ? activeUser?.Events : thisUser?.Events;
    console.log("AAAAAAAAAAAAAAAAAAAA: ",thisUser);
    
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
            eventos.map((event, index) => (
                    <div onClick={()=> setSelectedEvent(event.id) } key={index} class="w-3/4 border-2 border-red-600 mb-5 p-5">
                        <div>{event.title}</div>
                        {event.body.length>50 && <div> {event.body.slice(0,50) + ' . . .'} </div>}
                        {event.body.length<=50 && <div> {event.body} </div>}
                        <div>{event.date.slice(0, 10)}</div>
                    </div>

            ))}
        </div>
    )
}