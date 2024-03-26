import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeUser, guestTypeAction } from '../../../Redux/actions/actions';
import styles from '../../Create/CreateVisit/CreateVisit.module.css';
const defaultImage = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";

export const CreateVisit = () => {
	const { guestType, activeUser } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [imageURL, setImageURL] = useState('')
	const [imagePublicId, setImagePublicId] = useState('')

	const [form, setForm] = useState({
		name: '',
		surname: '',
		dni: '',
		company_name: '',
		labor: [],
		cuit: ''
	});

	const handleInputChange = (event) => 
	{
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleAddLabor = (event) => 
	{
		const selectedLabor = event.target.value;
		if(selectedLabor != 'default')
		{
			setForm({ ...form, labor: [selectedLabor] })
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			let completedForm = false;

			imageURL == '' ? 
			completedForm = { ...form, userId: activeUser.id, img: defaultImage } : 
			completedForm = { ...form, userId: activeUser.id, img: imageURL }

			if (guestType == 'visit')
			{
				
				if (submitButton == 'create_employee')
				{
					const { data } = await axios.post('http://localhost:3001/visitas', completedForm);
					alert('New visit created!', data);
					console.log("data: ", data);
					setShowForm(false)
				} else
				{
					const { data } = await axios.put(`http://localhost:3001/visitas?id=${activeUser.id}&dni=${form.dni}`);
					alert(`Se vinculó a ${form.name} ${form.surname} al usuario ${activeUser.name} ${activeUser.surname} correctamente!`)
					console.log('Vinculación: ', data);
					setShowForm(false)
				}
			};

			if (guestType == 'employee')
			{
				if (submitButton == 'create_employee')
				{
					const { data } = await axios.post(`http://localhost:3001/employees?id=${activeUser.id}`, completedForm);
					alert('Nuevo personal creado!', data);
					console.log("data: ", data);
					setShowForm(false)

				} else
				{
					const { data } = await axios.put(`http://localhost:3001/employees?id=${activeUser.id}&dni=${form.dni}`, { labor: form.labor[0] });
					alert(`Se vinculó a ${form.name} ${form.surname} al usuario ${activeUser.name} ${activeUser.surname} correctamente!`)
					console.log('Vinculación: ', data);
					setShowForm(false)

				}
			};

			if (guestType == 'provider')
			{
				const { data } = await axios.post('http://localhost:3001/providers', completedForm);
				alert('New provider created!', data);
				console.log("data: ", data);
				setShowForm(false)

			};

			setForm({
				name: '',
				surname: '',
				dni: '',
			})

			setImageURL('')

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
			console.error('Error creating visit: ', error);
			alert('No funciona!');
			console.log("DENEI", form.dni);
		}
	};

	// CLOUDINARY
	const changeUploadImage = async event => {
		try {
			const file = event.target.files[0]
			const data = new FormData()

			data.append('file', file)
			data.append('upload_preset', 'hlm8qowi')

			const response = await axios.post('https://api.cloudinary.com/v1_1/ddiz6bdow/image/upload', data)

			setImageURL(response.data.secure_url)
			setImagePublicId(response.data.public_id)
			console.log(response.data)
		} catch (error) {
			setImageURL('')
			console.log(`Error uploading image ${error.message}`)
		}
	}

	const handleDeleteImage = async () => {
		setImageURL('')
	}
	////
	const [ submitButton, setSubmitButton ] = useState(false)

	const handleSearchDni = async (event) =>
	{
		const currentDni = form.dni;

		if (event.key == 'Enter' || event.target.value == 'button' && currentDni !== '') {
			if (guestType == 'visit') {
				const { data } = await axios.get(`http://localhost:3001/visitas?dni=${currentDni}`);
				console.log('pasé por visitas');
				setShowForm(true);
				if (data) {
					setForm({
						...form,
						dni: data.dni,
						name: data.name,
						surname: data.surname,
					});
					setImageURL(data.img);
					setSubmitButton('link_to_user');
				} else {
					setSubmitButton('create_employee');
				}
			}
			if (guestType == 'employee') {
				const { data } = await axios.get(`http://localhost:3001/employees?dni=${currentDni}`);
				console.log('pasé por employees');
				setShowForm(true);
				if (data) {
					setForm({
						...form,
						dni: data.dni,
						name: data.name,
						surname: data.surname,
					});
					setImageURL(data.img);
					setSubmitButton('link_to_user');
				} else {
					setSubmitButton('create_employee');
				}
			}
		}
	}

	const findAnotherDni = () =>
	{
		setShowForm(false);

		setForm({
			name: '',
			surname: '',
			dni: '',
			labor: []
		})

		setImageURL('')
	}

	const [ showForm, setShowForm ] = useState(false)

	const findEmployeeByDni = async () =>
	{
		const currentDni = form.dni
		
		const { data } = await axios.get(`http://localhost:3001/employees?dni=${currentDni}`)

			setShowForm(true)

			console.log(data);
			
			if (data) {
				setForm({
					...form,
					dni: data.dni,
					name: data.name,
					surname: data.surname,
				});
				setImageURL(data.img);
				setSubmitButton('link_to_user')
			} else 
			{
				setSubmitButton('create_employee')
			}

	}

	return (
		<div className=' mt-4 '>
			<button type='button' onClick={() => console.log(form)}>logForm</button>
			<div name='Create Visit Navbar' className='flex justify-center gap-9 h-20'>
				<button
					onClick={() => {
						{dispatch(guestTypeAction('visit')); setShowForm(false); setForm({...form, dni: ''})};
					}}
					className={guestType == 'visit' ? ' bg-amber-400 w-80  hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer' : ' bg-white w-80 hover:bg-slate-300 active:bg-amber-400 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'}>
					<div className=' text-left '>
						<h5>Visitas</h5>
						<p className=' text-slate-500 text-xs'>Familiares, amigos o conocidos con visitas esporádicas o permanentes</p>
					</div>
				</button>

				<button
					onClick={() => {
						{dispatch(guestTypeAction('employee')); setShowForm(false); setForm({...form, dni: ''})};
					}}
					className={guestType == 'employee' ? ' bg-amber-400 w-80  hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer' : ' bg-white w-80 hover:bg-slate-300 active:bg-amber-400 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'}>
					<div className=' text-left '>
						<h5>Empleados</h5>
						<p className=' text-slate-500 text-xs'>Personas contratadas con visitas recurrentes</p>
					</div>
				</button>

				<button
					onClick={() => {
						{dispatch(guestTypeAction('provider')); setShowForm(false); setForm({...form, dni: ''})};
					}}
					className={guestType == 'provider' ? ' bg-amber-400 w-80  hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer' : ' bg-white w-80 hover:bg-slate-300 active:bg-amber-400 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'}>
					<div className=' text-left '>
						<h5>Proveedores</h5>
						<p className=' text-slate-500 text-xs'>Personas contratadas con visitas esporádicas</p>
					</div>
				</button>
			</div>
			
			{!showForm ? (<div className='flex justify-center mt-28'>
				<div className='flex flex-col text-cyan-50 gap-1'>
					{guestType == 'visit' && <h4>Ingrese el Nº de DNI de la persona: </h4>}
					{guestType == 'employee' && <h4>Ingrese el Nº de DNI del empleado: </h4>}
					{guestType == 'provider' && <h4>Ingrese el Nº de CUIT de la empresa: </h4>}

					<input
						type='text'
						name='dni'
						value={form.dni}
						onChange={handleInputChange}
						onKeyDown={handleSearchDni}
						className='w-96 h-9 rounded-sm outline-none text-black'
					/>
					{form.dni !== '' && <button className=' bg-slate-400' value='button' onClick={handleSearchDni}>Buscar</button>}
				</div>
			</div>) :

			(<div name='form' className='flex justify-center mt-28'>
				<form onSubmit={handleSubmit} className=' flex flex-col gap-9 text-cyan-50'>
					<div>
						<button onClick={findAnotherDni} className=' bg-slate-400 text-black'>Buscar otra persona</button>
					</div>
					<div className={styles.imageContainer}>
						{imageURL ? (
							<div className={styles.imgAndButton}>
								{submitButton == 'create_employee' && <button type='button' onClick={handleDeleteImage}>
									X
								</button>}
								<img src={imageURL} />
							</div>
						) : (
							<>
								<label>+ Agregar imagen</label>
								<input name='image' type='file' placeholder='asdasdasd' accept='image/*' value={form.img} onChange={changeUploadImage} />
							</>
						)}
					</div>
					<div>
						<h4>Nombre: </h4>
						{submitButton == 'create_employee' && <input
							type='text'
							name='name'
							value={form.name}
							onChange={handleInputChange}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>}

						{submitButton == 'link_to_user' && <input
							type='text'
							name='name'
							value={form.name}
							onChange={handleInputChange}
							disabled
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>}
					</div>

					<div>
						<h4>Apellido: </h4>
						{submitButton == 'create_employee' && <input
							type='text'
							value={form.surname}
							name='surname'
							onChange={handleInputChange}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>}

						{submitButton == 'link_to_user' && <input
							type='text'
							value={form.surname}
							name='surname'
							onChange={handleInputChange}
							disabled
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>}
					</div>

					<div>
						<h4>DNI: </h4>
						{submitButton == 'create_employee' && <input
							type='text'
							name='dni'
							value={form.dni}
							onChange={handleInputChange}
							onKeyDown={handleSearchDni}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>}

						{submitButton == 'link_to_user' && <input
							type='text'
							name='dni'
							value={form.dni}
							onChange={handleInputChange}
							onKeyDown={handleSearchDni}
							disabled
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>}
					</div>

					{/* {(guestType === 'employee' || guestType === 'provider') && (
						<div>
							<h4>Empresa: </h4>
							<input
								type='text'
								name='company'
								onChange={handleInputChange}
								className='w-96 h-9 rounded-sm outline-none text-black'
							/>
						</div>
					)} */}
					{guestType === 'employee' && (
						<div>
							<h4>Labor a asignar: </h4>
							{/* <input
								type='text'
								name='work'
								onChange={handleInputChange}
								className='w-96 h-9 rounded-sm outline-none text-black'
							/> */}
							<select onChange={handleAddLabor} name="" id="" className='w-96 h-9 rounded-sm outline-none text-black'>
								<option value="default">Seleccionar Empleo</option>
								<option value="Empleo 1">
									Empleo 1
								</option>
								<option value="Empleo 2">
									Empleo 2
								</option>
								<option value="Empleo 3">
									Empleo 3
								</option>
								<option value="Empleo 4">
									Empleo 4
								</option>
								<option value="Empleo 5">
									Empleo 5
								</option>
								<option value="Empleo 6">
									Empleo 6
								</option>
							</select>

						</div>
					)}
					
					{submitButton == 'create_employee' ? (<button
						type='submit'
						className='w-96 mb-12 bg-red-500 h-9 rounded-sm transition duration-300 hover:bg-slate-300 hover:text-black active:scale-95'>
						Crear Visita
					</button>) : (<button
						type='submit'
						className='w-96 mb-12 bg-red-500 h-9 rounded-sm transition duration-300 hover:bg-slate-300 hover:text-black active:scale-95'>
						Crear Vínculo
					</button>)}
					<button onClick={() => console.log(form)}>FORM SO FAR</button>
				</form>
			</div>)}
		</div>
	);
};
