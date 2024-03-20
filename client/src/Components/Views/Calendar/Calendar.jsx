import { useState } from "react";
// import Calendar from 'react-calendar';
import { useSelector } from "react-redux";
import '../Calendar/Calendar.css';
import styles from "./Calendar.module.css";
import { CreateEvent } from "./CreateEvent/CreateEvent.jsx";
import { EventList } from "./EventList/EventList.jsx";

// Big Calendar
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventCard } from "./EventCard/EventCard.jsx";

const localizer = dayjsLocalizer(dayjs)
//

export const Calendario = ( { thisUser } ) =>
{
	const activeUser = useSelector((state) => state.activeUser);
	const activeGuard = useSelector( state => state.activeGuard);
	const [selectedDate, setSelectedDate] = useState(new Date());
    const [ selectedEvent, setSelectedEvent ] = useState(false);

	console.log("THIS USER EN CALENDAR: ", thisUser);

	let userEvents = '';

	if(activeUser)
	{
		userEvents = activeUser.Events.map((x) =>
		{return {
			start: dayjs(x.date.slice(0, 10) + 'T' + x.startsAt + ":00").toDate(),
			end: dayjs(x.date.slice(0, 10) + 'T' + x.endsAt + ":00").toDate(),
			title: x.title,
			id: x.id
		}})
	}

	if(activeGuard)
	{
		userEvents = thisUser.Events?.map((x) => 
		{return {
			start: dayjs(x.date.slice(0, 10) + 'T' + x.startsAt + ":00").toDate(),
			end: dayjs(x.date.slice(0, 10) + 'T' + x.endsAt + ":00").toDate(),
			title: x.title,
			id: x.id
		}})
	}

	
	

	const handleDateChange = (date) => {
		setSelectedDate(date);
        setSelectedEvent(false);
		console.log("date change: ",userEvents);
	};

	const handleSelectEvent = (event) => {
        // Redirige a la sección del día del evento seleccionado
        setSelectedDate();
        setSelectedEvent(event.id);
    }

	return (
		<div className=' flex flex-col'>
			<div>
				<button onClick={() => console.log('Date: ', selectedDate)}> Date </button>
				<button onClick={() => console.log("thisUser: ", thisUser)}> THIS USER !!!</button>
				<h1> Calendario de visitas </h1>
                <div className='grid grid-cols-2 gap-3'>
				<div style={{ height: '600px', width: '100%' }} className='bigCalendar-container'>
					<Calendar
                        value={selectedDate}
						localizer={localizer}
						events={userEvents}
						startAccessor='start'
						endAccessor='end'
						onSelectSlot={(slotInfo) => handleDateChange(slotInfo.start)}
						selectable
						onSelectEvent={(event) => handleSelectEvent(event)}
						messages={{
							next: 'Sig.',
							previous: 'Ant.',
							today: 'Hoy',
							month: 'Mes',
							week: 'Semana',
						}}
					/>
				</div>
				<div>
                    <div className={styles.list}>
                        { !selectedEvent && <EventList selectedDate={selectedDate} setSelectedEvent={setSelectedEvent} thisUser={thisUser}/>}
                        { selectedEvent && <EventCard id={selectedEvent} setSelectedEvent={setSelectedEvent} thisUser={thisUser} /> }
                    </div>
				</div>
			</div>
				<br />
				<hr />
				<br />
				{ activeUser &&
				<div className={styles.container}>
					<div className={styles.create}>
						<CreateEvent selectedDate={selectedDate} />
					</div>
					
				</div>}
			</div>
			
		</div>
	);
}