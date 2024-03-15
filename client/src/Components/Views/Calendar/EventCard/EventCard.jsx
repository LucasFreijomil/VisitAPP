import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { modifyEvent, refreshUserInfo } from '../../../../Redux/actions/actions.js';
import './EventCard.css';
import { EventGuest } from './EventGuest/EventGuest';

export const EventCard = ( { id, setSelectedEvent } ) =>
{
    const [ event, setEvent ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ extra, setExtra ] = useState(false);
    const [ input, setInput ] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ addGuest, setAddGuest ] = useState(false);

    const [ putGuestForm, setPutGuestForm] = useState(
    {
      eventId: id,
      visits: [],
      add: 'true/false'
    })

    let url = "http://localhost:3001/";

    const { updateUserInfo, activeUser } = useSelector((state) => state)
    var dispatch = useDispatch();

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    useEffect( () =>
    {
        axios.get(`${url}events?id=${id}`)
        .then( ( { data } ) =>
        {
            console.log("Event details succesfully fetched for the first time.");
            setEvent(data);
            setExtra(data.date?.slice(10));
            setIsChecked(data.alarm);
            console.log(data);
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
            console.log("Event details succesfully fetched again.");
            setEvent(data);
            setExtra(data.date?.slice(10));
            setIsChecked(data.alarm);
            setSelectedEvent(data.id);
        })
        .catch( ( error ) =>
        {
            console.log("ERROR fetching event details: ", error);
            setEvent(false);
        })

        if (updateUserInfo) dispatch(refreshUserInfo(false));
        if (!updateUserInfo) dispatch(refreshUserInfo(true));

        console.log("las visitas del evento", event);
        
    }, [modifyEvent, edit])

    const handleChange = e =>
    {
      const {name, value} = e.target;
      setInput( { [name]: value } );
    }

    const newDate = async () =>
    {
      await modifyEvent( { date: input.date + extra }, event.id );
      setEdit(false);
      // window.location.reload();
    }

    const newItem = async () =>
    {
      await modifyEvent(input, event.id);
      setEdit(false);
      // window.location.reload();
    }

    const handleCheckboxChange = async (e) =>
    {
      setIsChecked(e.target.checked);
      await modifyEvent( { alarm: e.target.checked }, event.id);
    };

    const filteredVisits = activeUser.Visitas?.filter((visita) => 
    {
      return !event.Visitas?.some((eventVisit) => eventVisit.dni === visita.dni);
    });

    const handlePutGuest = (e) => 
    {
      const selectedGuest = e.target.value.split(',')[0];

      if (!putGuestForm.visits.includes(selectedGuest) && selectedGuest !== "default") {
        setPutGuestForm({ ...putGuestForm, visits: [...putGuestForm.visits, selectedGuest] });
      }

      console.log(putGuestForm)
    }

    return (
      <div >
      {/* <button onClick={() => console.log("Event: ", event )}> EVENTO </button> */}
      <button class='button' onClick={() => setSelectedEvent(false) }> ← </button>

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

          {edit!='body' && (<>
          <h1> Descripción: <label onClick={()=>setEdit('body')}> 🖋 </label> </h1>
           { event.body }
          </>)}
          {edit=='body' && (
          <>
            <h1> Descripción: </h1>

              <textarea style={{ width: "70%" }} type='text' name='body'  placeholder=' . . .' onChange={handleChange} />

            <label onClick={() => { setEdit(false); setInput(false); }}> ✖ </label>
            <button onClick={ newItem }> ✔ </button>
          </>)}

      <div className='grid grid-cols-2 gap-3'>

        <div>

          <br/>
          <hr/>
          <br/>

          {edit!='date' && (<>
          <label> Fecha: { event.date?.slice(0,10) } </label> <label onClick={()=>setEdit('date')}> 🖋 </label>
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

          <label> Alarma </label>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />

          <br/>
          <br/>

          <label> Creado por: {event.User?.name} {event.User?.surname} </label>
          
        </div>
        <div>
								<div >
									<Slider {...settings} style={{ maxWidth: '97%'}} className='h-full'>
										{event.Visitas?.map((x, y) => (
											<div key={y}>
												<EventGuest guest={x} />
											</div>
										))}

                    {addGuest == false ? <div>
                      <button className=' bg-slate-400' onClick={() => {setAddGuest(true); setPutGuestForm({...putGuestForm, add: true}); console.log(putGuestForm);}}>Agregar Invitado</button> 
                      </div> : (filteredVisits.length > 0 ? <div> <button className=' bg-red-700' onClick={() => setAddGuest(false)}>X</button> <div>
                        <select onChange={handlePutGuest} name='visitId'>
                        <option value={false}>Seleccionar visita</option>
                        {filteredVisits.map((x, y) => (
                          <option value={[x.id, x.name]} key={y}>
                            {x.name}
                          </option>
                        ))}

						            </select>

                        {putGuestForm.visits?.length > 0 &&
                          putGuestForm.visits.map((vis, v) => {
                            const name = vis.split(',')[1];
                            return <div key={v}>{name}</div>;
                        })}
                      </div> 
                      </div> : <div>No hay más invitados para agregar!</div>)}

									</Slider>
								</div>
							</div>
      </div>

      <br/>
      <hr/>

      {/* <div style={{marginTop: '20px'}}>
        Datos Extra en el Fondo
        </div> */}
    </div>
				);
}