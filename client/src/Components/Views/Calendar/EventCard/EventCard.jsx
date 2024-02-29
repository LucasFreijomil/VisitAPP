import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { modifyEvent } from '../../../../Redux/actions/actions.js';
import { EventGuest } from './EventGuest/EventGuest';

export const EventCard = () =>
{
    const { id } = useParams();
    const [ event, setEvent ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    let date = event.date?.slice(0,10);
    const [ fullDate, setFullDate ] = useState( {day: '', month: '', year: '', extra: event.date?.slice(10) } );
    const [ input, setInput ] = useState(false);
    let url = "http://localhost:3001/";

    useEffect( () =>
    {
        axios.get(`${url}events?id=${id}`)
        .then( ( { data } ) =>
        {
            console.log("Event details succesfully fetched.");
            setEvent(data);
        })
        .catch( ( error ) =>
        {
            console.log("ERROR fetching event details: ", error);
            setEvent(false);
        })
    }, [])

    useEffect( () =>
    {
        axios.get(`${url}events?id=${id}`)
        .then( ( { data } ) =>
        {
            console.log("Event details succesfully fetched.");
            setEvent(data);
        })
        .catch( ( error ) =>
        {
            console.log("ERROR fetching event details: ", error);
            setEvent(false);
        })
    }, [modifyEvent])

    const handleChange = e =>
    {
      const {name, value} = e.target;
      setInput( { [name]: value } );
    }

    const handleDate = e =>
    {
      const { name, value } = e.target;
      setFullDate( prevInput => ( {...prevInput, [name]: value, extra: event.date.slice(10) } ) )
    }

    const newDate = () =>
    {
      modifyEvent( { date: input.date + fullDate.extra }, event.id );
      window.location.reload();
    }

    const newItem = () =>
    {
      modifyEvent(input, event.id);
      setEdit(false);
      window.location.reload();
    }

    return (
        <div >
          <button onClick={() => console.log("Event: ", event )}> EVENTO </button>

          <div style={{fontSize: '24px', textAlign: 'center'}}>
            {edit!='title' && (<>
            <h1> Título: { event.title } </h1> <label onClick={()=>setEdit('title')}> '('✍')' </label>
            </>)}
            {edit=='title' && (
            <>
              <label> Título: </label> <input type='text' name='title' placeholder=' . . .' onChange={handleChange} />
              <label onClick={() => { setEdit(false); setInput(false); }}> ✖ </label>
              <button onClick={ newItem }> ✔ </button>
            </>)}
          </div>

              <br/>
              <hr/>

          <div className='grid grid-cols-2 gap-3'>

            <div>

              {event.body}

              <br/>
              <hr/>
              <br/>

              {edit!='date' && (<>
              <label> Fecha: { date } </label> <label onClick={()=>setEdit('date')}> 🖋 </label>
              </>)}
              {edit=='date' && (
              <>
                <label> Fecha: </label>
                <input type='date' name='date' onChange={handleChange} />
                <label onClick={() => { setEdit(false); setInput(false); }}> ✖ </label>
                <button onClick={newDate}> ✔ </button>
              </>)}

              <br/>

              {edit!='startsAt' && (<>
              <label> Hora de comienzo: { event.startsAt } </label> <label onClick={()=>setEdit('startsAt')}> 🖋 </label>
              </>)}
              {edit=='startsAt' && (
              <>
                <label> Hora de comienzo: </label> <input type='time' name='startsAt' placeholder=' . . .' onChange={handleChange} />
                <label onClick={() => { setEdit(false); setInput(false); }}> ✖ </label>
                <button onClick={ newItem }> ✔ </button>
              </>)}

              <br/>

              {edit!='endsAt' && (<>
              <label> Hora de Finalización: { event.endsAt } </label> <label onClick={()=>setEdit('endsAt')}> 🖋 </label>
              </>)}
              {edit=='endsAt' && (
              <>
                <label> Hora de Finalización: </label> <input type='time' name='endsAt' placeholder=' . . .' onChange={handleChange} />
                <label onClick={() => { setEdit(false); setInput(false); }}> ✖ </label>
                <button onClick={ newItem }> ✔ </button>
              </>)}

              <br/>

              <label> Creado por: {event.User?.name} {event.User?.surname} </label>
              
            </div>
            <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
              { event.Visitas?.map( (x, y) => (
                <div key={y} style={{ flex: '0 0 100%' }}>
                  <EventGuest guest={x} />
                </div>
              ) )}
            </div>
          </div>


          <br/>
          <hr/>

          <div style={{marginTop: '20px'}}>
            Datos Extra en el Fondo
            </div>
        </div>
      );
}