import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { modifyVisit } from '../../../Redux/actions/actions.js';

export const VisitDetail = () => {
	const { currentVisitDetailId } = useSelector((state) => state);
	const [showVisit, setShowVisit] = useState(null);
	const [ editCompany, setEditCompany ] = useState(false);
	const [ editWork, setEditWork ] = useState(false);
	const [ input, setInput ] = useState(false)

	useEffect(() => {
		axios
			.get(`http://localhost:3001/visitas?dni=${currentVisitDetailId}`)
			.then(({ data }) => {
				console.log(`Success fetching visit ${currentVisitDetailId}!`, data);
				setShowVisit(data);
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

	return (
		<div className='w-full mt-10 flex justify-center'>
			<div className=' grid grid-cols-2 h-96 w-4/5 bg-slate-400 rounded-xl'>
                <div name='first-column ' className='flex flex-col justify-center items-center'>
                    <div name='photo-container' className=' w-56 h-56 border border-stone-950 flex flex-col justify-center items-center '>
                        <img src={showVisit.img} />
                    </div>
                </div>
                <div name='second-column' className=' bg-slate-300 flex flex-col justify-evenly items-center rounded-r-xl'>
                <div className='flex flex-col gap-4'>
				<p className=' text-4xl'>Name: {showVisit?.name}, {showVisit?.surname}</p>
				<p className=' text-4xl'></p>
				<p className=' text-4xl'>DNI: {showVisit?.dni}</p>
				{showVisit?.work && (<p className=' text-4xl'>Work: {showVisit?.work}</p>)}
				{showVisit?.work && (
				<>
					{!editWork && <p className=' text-4xl'>Trabajo: {showVisit?.work}</p>}
					{editWork && <input type='text' name='work' placeholder='tusn MEGA nalgas' onChange={handleChange} />}
					{editWork && <button onClick={ () => enviarCambios(input, showVisit.id) }> Enviar </button>}
					<button onClick={() => console.log("input: ", input)}> input so far </button>
					<button onClick={() => setEditWork(!editWork)}> EDITAR TRABAJO </button>
				</>
				)}
				{showVisit?.company && (
				<>
					{!editCompany && <p className=' text-4xl'>Company: {showVisit?.company}</p>}
					{editCompany && <input type='text' name='company' placeholder='tus nalgas' onChange={handleChange} />}
					{editCompany && <button onClick={ () => enviarCambios(input, showVisit.id) }> Enviar </button>}
					<button onClick={() => console.log("input: ", input)}> input so far </button>
					<button onClick={() => setEditCompany(!editCompany)}> EDITAR COMPAÑIA </button>
				</>
				)}
                </div>
                </div>
			</div>
		</div>
	);
};
