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
		cuit: ''
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			let completedForm = false;

			imageURL == '' ? 
			completedForm = { ...form, userId: activeUser.id, img: defaultImage } : 
			completedForm = { ...form, userId: activeUser.id, img: imageURL }

			if (guestType == 'visit')
			{
				const { data } = await axios.post('http://localhost:3001/visitas', completedForm);
				alert('New visit created!', data);
				console.log("data: ", data);
			};

			if (guestType == 'employee')
			{
				const { data } = await axios.post('http://localhost:3001/employees', completedForm);
				alert('New employee created!', data);
				console.log("data: ", data);
			};

			if (guestType == 'provider')
			{
				const { data } = await axios.post('http://localhost:3001/providers', completedForm);
				alert('New provider created!', data);
				console.log("data: ", data);
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

	return (
		<div className=' mt-4 '>
			<button type='button' onClick={() => console.log(form)}>logForm</button>
			<div name='Create Visit Navbar' className='flex justify-center gap-9 h-20'>
				<button
					onClick={() => {
						dispatch(guestTypeAction('visit'));
					}}
					className=' bg-white w-80 hover:bg-slate-300 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'>
					<div className=' text-left '>
						<h5>Visitas</h5>
						<p className=' text-slate-500 text-xs'>Familiares, amigos o conocidos con visitas esporádicas o permanentes</p>
					</div>
				</button>

				<button
					onClick={() => {
						dispatch(guestTypeAction('employee'));
					}}
					className=' bg-white w-80 hover:bg-slate-300 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'>
					<div className=' text-left '>
						<h5>Empleados</h5>
						<p className=' text-slate-500 text-xs'>Personas contratadas con visitas recurrentes</p>
					</div>
				</button>

				<button
					onClick={() => {
						dispatch(guestTypeAction('provider'));
					}}
					className=' bg-white w-80 hover:bg-slate-300 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'>
					<div className=' text-left '>
						<h5>Proveedores</h5>
						<p className=' text-slate-500 text-xs'>Personas contratadas con visitas esporádicas</p>
					</div>
				</button>
			</div>

			<div name='form' className='flex justify-center mt-28'>
				<form onSubmit={handleSubmit} className=' flex flex-col gap-9 text-cyan-50'>
					<div className={styles.imageContainer}>
						{imageURL ? (
							<div className={styles.imgAndButton}>
								<button type='button' onClick={handleDeleteImage}>
									X
								</button>
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
						<input
							type='text'
							name='name'
							value={form.name}
							onChange={handleInputChange}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>
					</div>

					<div>
						<h4>Apellido: </h4>
						<input
							type='text'
							value={form.surname}
							name='surname'
							onChange={handleInputChange}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>
					</div>

					<div>
						<h4>DNI: </h4>
						<input
							type='text'
							name='dni'
							value={form.dni}
							onChange={handleInputChange}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>
					</div>

					{(guestType === 'employee' || guestType === 'provider') && (
						<div>
							<h4>Empresa: </h4>
							<input
								type='text'
								name='company'
								onChange={handleInputChange}
								className='w-96 h-9 rounded-sm outline-none text-black'
							/>
						</div>
					)}
					{guestType === 'employee' && (
						<div>
							<h4>Labor: </h4>
							<input
								type='text'
								name='work'
								onChange={handleInputChange}
								className='w-96 h-9 rounded-sm outline-none text-black'
							/>
						</div>
					)}
					
					<button
						type='submit'
						className='w-96 mb-12 bg-red-500 h-9 rounded-sm transition duration-300 hover:bg-slate-300 hover:text-black active:scale-95'>
						Crear Visita
					</button>
				</form>
			</div>
		</div>
	);
};
