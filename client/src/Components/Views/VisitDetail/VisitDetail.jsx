import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { modifyVisit } from '../../../Redux/actions/actions.js';


export const VisitDetail = () => {
	const url = 'http://localhost:3001/'
	const { currentVisitDetailId } = useSelector((state) => state);
	const [showVisit, setShowVisit] = useState(null);
	const [ editCompany, setEditCompany ] = useState(false);
	const [ editWork, setEditWork ] = useState(false);
	const [ input, setInput ] = useState(false)
	const [ selectedEvent, setSelectedEvent ] = useState(false)

	useEffect(() => {
		axios
			.get(`http://localhost:3001/visitas?dni=${currentVisitDetailId}`)
			.then(({ data }) => {
				console.log(`Success fetching visit ${currentVisitDetailId}!`, data);
				setShowVisit(data);
				console.log(data);
			})
			.catch((error) => {
				console.log('Error geting visit: ', error);
			});
	}, []);

	const handleChange = e =>
    {
		const {name, value} = e.target;
		setInput( { [name]: value } );
	}

	const enviarCambios = ( form, id ) =>
	{
		modifyVisit(form, id) && alert("¡Cambiado satisfactoriamente!");
	}

	const fetchSelectedEvent = async (eventId) =>
	{
		try {
			const { data } = await axios.get(`${url}events?id=${eventId}`)
			setSelectedEvent(data)
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='w-full mt-6 flex justify-center'>
				<div className=' grid grid-cols-2 h-96 w-4/5 bg-slate-400 rounded-xl'>
					<div name='first-column ' className='flex flex-col justify-center items-center'>
						<div
							name='photo-container'
							className=' w-56 h-56 border border-stone-950 flex flex-col justify-center items-center '>
							<img src={showVisit?.img} />
						</div>
					</div>
					<div name='second-column' className=' bg-slate-300 flex flex-col justify-evenly items-center rounded-r-xl'>
						<div className='flex flex-col gap-4'>
							<p className=' text-4xl'>
								Name: {showVisit?.name}, {showVisit?.surname}
							</p>
							<p className=' text-4xl'></p>
							<p className=' text-4xl'>DNI: {showVisit?.dni}</p>
							{showVisit?.work && <p className=' text-4xl'>Work: {showVisit?.work}</p>}
							{showVisit?.work && (
								<>
									{!editWork && <p className=' text-4xl'>Trabajo: {showVisit?.work}</p>}
									{editWork && <input type='text' name='work' placeholder='tusn MEGA nalgas' onChange={handleChange} />}
									{editWork && <button onClick={() => enviarCambios(input, showVisit.id)}> Enviar </button>}
									<button onClick={() => console.log('input: ', input)}> input so far </button>
									<button onClick={() => setEditWork(!editWork)}> EDITAR TRABAJO </button>
								</>
							)}
							{showVisit?.company && (
								<>
									{!editCompany && <p className=' text-4xl'>Company: {showVisit?.company}</p>}
									{editCompany && <input type='text' name='company' placeholder='tus nalgas' onChange={handleChange} />}
									{editCompany && <button onClick={() => enviarCambios(input, showVisit.id)}> Enviar </button>}
									<button onClick={() => console.log('input: ', input)}> input so far </button>
									<button onClick={() => setEditCompany(!editCompany)}> EDITAR COMPAÑIA </button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-row w-4/5'>
				<div className=' overflow-scroll bg-slate-800 rounded-md h-96 w-2/5 p-5 flex flex-col gap-5 mt-10'>
					{showVisit?.Events &&
						showVisit.Events.map((x) => (
							<div
								onClick={() => {
									fetchSelectedEvent(x.id);
									console.log(selectedEvent);
								}}
								className='flex flex-row gap-5 bg-lime-600 hover:bg-lime-700 p-3 justify-between rounded-md'>
								<div value={x} className='text-white'>
									{x.title}
								</div>
								<div>{x.date.slice(0, 10)}</div>
							</div>
						))}
				</div>
				<div className='w-full mt-5 ml-5'>
					<div className='w-full h-96 p-3 bg-slate-300 flex flex-col rounded-md gap-5 mt-5 mb-10'>
						{selectedEvent ? (
							<div className='flex flex-col gap-1'>
								<button onClick={() => setSelectedEvent(false)} className=' bg-red-800 w-4'>
									X
								</button>
								<div className='w-full bg-slate-800 rounded-sm  text-white flex justify-center'>Evento</div>
								<h1>{selectedEvent?.title}</h1>
								<div className='w-full bg-slate-800 rounded-sm text-white flex justify-center'>Fecha</div>
								<h1>{selectedEvent?.date}</h1>
								<div className='w-full bg-slate-800 rounded-sm text-white flex justify-center'>Horario</div>
								<h1>
									De {selectedEvent?.startsAt} hs a {selectedEvent.endsAt} hs
								</h1>
								<div className='w-full bg-slate-800 rounded-sm text-white flex justify-center'>Notas</div>
								<h1>{selectedEvent?.body}</h1>
								<div className='w-full bg-slate-800 rounded-sm text-white flex justify-center'>Invitados</div>
								<div className=' overflow-scroll h-20 bg-slate-400 p-1 mb-1'>
								{selectedEvent?.Visitas.map((x, y) => 
								(
									<h1 className=' border-b'>
										{y + 1 } | {x.name} {x.surname}
									</h1>
									
								))}
								</div>
							</div>
						) : (
							<div className=' h-full text-5xl text-slate-400 flex justify-center items-center'>No hay eventos seleccionados...</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
