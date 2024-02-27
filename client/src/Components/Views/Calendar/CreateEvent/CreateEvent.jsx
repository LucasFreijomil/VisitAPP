import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeUser } from '../../../../Redux/actions/actions';

export const CreateEvent = ({ selectedDate }) => {
	const { activeUser } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		title: '',
		date: '',
		startsAt: '',
		endsAt: '',
		body: '',
		alarm: false,
		visitId: [],
		userId: activeUser.id,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevInput) => ({ ...prevInput, [name]: value }));
	};

	const handleSelectVisit = (e) => {
		const selectedVisit = e.target.value;

		if (!form.visitId.includes(selectedVisit)) {
			setForm({ ...form, visitId: [...form.visitId, selectedVisit] });
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
			userId: form.userId,
		};
		try {
			const { data } = await axios.post('http://localhost:3001/events', definitiveForm);
			alert('New event created!', data);
			console.log('New event created!', data);
			setForm({
				title: '',
				date: '',
				startsAt: '',
				endsAt: '',
				body: '',
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
		} catch (error) {
			console.error('Error creating event: ', error.message);
			console.log('DEFINITIVE', definitiveForm);
			alert('Error creating event');
		}
	};

	// Provisorio //////////////////////
	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		console.log(form.visitId);
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
