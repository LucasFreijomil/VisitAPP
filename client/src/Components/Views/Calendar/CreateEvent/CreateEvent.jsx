import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeUser } from '../../../../Redux/actions/actions';

export const CreateEvent = ({ selectedDate }) => {
	const { activeUser } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [ checked, setChecked ] = useState( false );
	const [form, setForm] = useState({
		title: '',
		date: '',
		startsAt: '',
		endsAt: '',
		body: '',
		alarm: false,
		visitId: [],
		alarmDistance: [],
		userId: activeUser.id,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevInput) => ({ ...prevInput, [name]: value }));
	};

	const handleSelectVisit = (e) => {

		if(e.target.name=='visitId')
		{
			if (!form.visitId.includes(e.target.value) && e.target.value !== 'default') {
				setForm({ ...form, visitId: [...form.visitId, e.target.value] });
			}
		}
		else
		{
			if (!form.alarmDistance.includes(e.target.value)) {
				setForm({ ...form, alarmDistance: [...form.alarmDistance, e.target.value] });
			}
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const selectedVisitId = form.visitId.map((x) => x.split(',')[0]);

		const definitiveForm = {
			title: form.title,
			date: selectedDate,
			startsAt: form.startsAt,
			endsAt: form.endsAt,
			body: form.body,
			alarm: form.alarm,
			visitId: selectedVisitId,
			alarmDistance: form.alarmDistance,
			userId: form.userId,
		};
		try
		{
			const { data } = await axios.post('http://localhost:3001/events', definitiveForm);
			alert('New event created!', data);
			console.log('New event created!', data);
			setForm({
				title: '',
				date: '',
				startsAt: '',
				endsAt: '',
				body: '',
				alarm: false,
				visitId: [],
				alarmDistance: [],
				userId: activeUser.id,
			});
			decodeUser( JSON.parse( window.localStorage.getItem('activeUser') ) )
			.then( ( data ) =>
			{
				dispatch(data);
			})
			.catch( ( error ) =>
			{
				console.log("Error al logear usuario, promesa app.jsx: ", error);
			})
		}
		catch(error)
		{
			console.error('Error creating event: ', error);
			console.log('DEFINITIVE', definitiveForm);
			alert('Error creating event');
		}
	};

	const handleCheckboxChange = (e) =>
	{
		setChecked(e.target.checked);
		setForm( { ...form, alarm: e.target.checked } );
	}

	// Provisorio //////////////////////
	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		console.log('form.visitId: ' ,form.visitId);
	}, [form.visitId]);
	///////////////////////////////////

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='relative bg-brown px-6 pt-10 pb-6 shadow-xl ring-gray-600/5 sm:max-w-lg sm:rounded-lg sm:px-10'>
				<fieldset>
					<div>
						<p>title</p>
						<input type='text' name='title' value={form.title} onChange={handleChange} />
					</div>
					<br />

					<div>
						<p>startsAt</p>
						<input type='text' name='startsAt' value={form.startsAt} onChange={handleChange} />
					</div>
					<br />

					<div>
						<p>endsAt</p>
						<input type='text' name='endsAt' value={form.endsAt} onChange={handleChange} />
					</div>
					<br />

					<div>
						<p>body</p>
						<input type='text' name='body' value={form.body} onChange={handleChange} />
					</div>
					<br />

					<div>
						<p>visitante</p>
						<select name='visitId' onChange={handleSelectVisit}>
							<option value="default">Seleccionar Visita</option>
							{activeUser.Visitas.length > 0 &&
								activeUser.Visitas?.map((x, y) => (
									<option value={[x.id, x.name]} key={y}>
										{x.name}
									</option>
								))}
						</select>
						<br />
						{form.visitId?.length > 0 &&
							form.visitId.map((vis, v) => {
								const name = vis.split(',')[1];
								return <div key={v}>{name}</div>;
							})}
					</div>

					<input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
					<label> ALARMA </label>

					<br/>

					{ checked &&
						<div>
							<p> ¿Cuando? </p>
							<select name='alarmDistance' onChange={handleSelectVisit}>
								<option selected disabled > ---- </option>
								<option value={'1 Día antes'} > 1 Día </option>
								<option value={'7 Días antes'} > 7 Días </option>
								<option value={'12 Horas antes'} > 12 Horas </option>
							</select>
							<br />
							{ form.alarmDistance.length>0 && form.alarmDistance.map( x => <> <label> { x } </label> <br/> </>) }
						</div> }

						<button type='button' onClick={()=> console.log("Form: ", form)}> FORM </button>

					<button
						type='submit'
						className=' w-48 bg-slate-400 transition duration-300 hover:bg-white'
						>
						Submit
					</button>
					<br />
				</fieldset>
			</form>
			Soy el CreateEvent
		</div>
	);
};
