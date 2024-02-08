import {useSelector, useDispatch} from 'react-redux'
import {guestTypeAction} from '../../../Redux/actions/actions'

export const CreateVisit = () => {
	const {guestType} = useSelector(state => state)
	const dispatch = useDispatch()

	const handleSubmit = () => {}

	return (
		<div className=' mt-4 '>
			<div name='Create Visit Navbar' className='flex justify-center gap-9 h-20'>
				<button
					onClick={() => {
						dispatch(guestTypeAction('visit'))
					}}
					className=' bg-white hover:bg-slate-300 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'>
					<div className=' text-left '>
						<h5>Visitas</h5>
						<p className=' text-slate-500 text-xs'>Familiares, amigos o conocidos con visitas esporádicas o permanentes</p>
					</div>
				</button>

				<button
					onClick={() => {
						dispatch(guestTypeAction('employee'))
					}}
					className=' bg-white hover:bg-slate-300 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'>
					<div className=' text-left '>
						<h5>Empleados</h5>
						<p className=' text-slate-500 text-xs'>Familiares, amigos o conocidos con visitas esporádicas o permanentes</p>
					</div>
				</button>

				<button
					onClick={() => {
						dispatch(guestTypeAction('provider'))
					}}
					className=' bg-white hover:bg-slate-300 hover:scale-105 duration-300 rounded-lg p-4 cursor-pointer'>
					<div className=' text-left '>
						<h5>Proveedores</h5>
						<p className=' text-slate-500 text-xs'>Familiares, amigos o conocidos con visitas esporádicas o permanentes</p>
					</div>
				</button>
			</div>

			<div name='form' className='flex justify-center mt-28'>
				<form onSubmit={handleSubmit} className=' flex flex-col gap-9 text-cyan-50'>
					<div>
						<h4>Nombre: </h4>
						<input type='text' className='w-96 h-9 rounded-sm outline-none text-black' />
					</div>

					<div>
						<h4>Apellido: </h4>
						<input type='text' className='w-96 h-9 rounded-sm outline-none text-black' />
					</div>

					<div>
						<h4>DNI: </h4>
						<input type='text' className='w-96 h-9 rounded-sm outline-none text-black' />
					</div>

					{(guestType === 'employee' || guestType === 'provider') && (
						<div>
							<h4>Empresa: </h4>
							<input type='text' className='w-96 h-9 rounded-sm outline-none text-black' />
						</div>
					)}
				</form>
			</div>
		</div>
	)
}
