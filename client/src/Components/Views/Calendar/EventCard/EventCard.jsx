import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { modifyEvent } from '../../../../Redux/actions/actions.js';
import { EventGuest } from './EventGuest/EventGuest';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const EventCard = () =>
{
    const { id } = useParams();
    const [ event, setEvent ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    let date = event.date?.slice(0,10);
    const [ input, setInput ] = useState(false);
    let url = "http://localhost:3001/";

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  
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

    const handleChange = e =>
    {
      const {name, value} = e.target;
      setInput( { [name]: value } );
    }

    return (
					<div>
						<div style={{ fontSize: '24px', textAlign: 'center' }}>
							{edit != 'name' && (
								<>
									<h1> Nombre: {event.title} </h1> <label onClick={() => setEdit('name')}> '('✍')' </label>
								</>
							)}
							{edit == 'name' && (
								<>
									<label> Nombre: </label> <input type='text' name='name' placeholder=' . . .' onChange={handleChange} />
									<label
										onClick={() => {
											setEdit(false);
											setInput(false);
										}}>
										{' '}
										✖{' '}
									</label>
									<button onClick={() => modifyEvent(input, event.id)}> ✔ </button>
								</>
							)}
						</div>

						<br />
						<hr />

						<div className='grid grid-cols-2 gap-3'>
							<div>
								{event.body}
								<br />
								<hr />
								<br />
								<label> Fecha: {date} </label>
								<br />
								<label> Hora de comienzo: {event.startsAt} </label>
								<br />
								<label> Hora de Finalización: {event.endsAt} </label>
								<br />
								<label>
									{' '}
									Creado por: {event.User?.name} {event.User?.surname}{' '}
								</label>
							</div>
							<div>
								<div >
									<Slider {...settings} style={{ maxWidth: '97%'}} className='h-full'>
										{event.Visitas?.map((x, y) => (
											<div key={y}>
												<EventGuest guest={x} />
											</div>
										))}
									</Slider>
								</div>
							</div>
						</div>

						<br />
						<hr />

						<div style={{ marginTop: '20px' }}>Datos Extra en el Fondo</div>
					</div>
				);
}