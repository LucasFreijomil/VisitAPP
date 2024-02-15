import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guestTypeAction } from '../../../Redux/actions/actions';

export const CreateVisit = () => {
	const { guestType, activeUser } = useSelector((state) => state);
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		name: '',
		surname: '',
		dni: '',
		company: '',
		work: '',
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			let completedForm = { ...form, userId: activeUser.id };
			const { data } = await axios.post('http://localhost:3001/visitas', completedForm);
			alert('New visit created!', data);
			setForm({
				name: '',
				surname: '',
				dni: '',
				company: '',
				work: '',
			})
		} catch (error) {
			console.error('Error creating visit: ', error);
			alert('No funciona!');
		}
	};

	return (
		<div className=' mt-4 '>
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
					<div>
						<h4>Nombre: </h4>
						<input
							type='text'
							name='name'
							onChange={handleInputChange}
							className='w-96 h-9 rounded-sm outline-none text-black'
						/>
					</div>

					<div>
						<h4>Apellido: </h4>
						<input
							type='text'
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
						className='w-96 bg-red-500 h-9 rounded-sm transition duration-300 hover:bg-slate-300 hover:text-black active:scale-95'>
						Crear Visita
					</button>
				</form>
			</div>
		</div>
	);
};
