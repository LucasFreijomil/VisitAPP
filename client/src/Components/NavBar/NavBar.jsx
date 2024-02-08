import {Link} from 'react-router-dom'

export const NavBar = () => {
	return (
		<div className=' bg-blue-600 flex justify-evenly items-center h-20 text-cyan-50'>
			<div>
				<Link
					className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
					to='/home'>
					<button> Home </button>
				</Link>
			</div>

			<div>
				<Link
					className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
					to='/createuser'>
					<button className=''> Crear Usuario</button>
				</Link>
			</div>

			<div>
				<Link
					className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
					to='/createvisit'>
					<button> Crear Visita </button>
				</Link>
			</div>

			<div>
				<Link className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-slate-600 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300' 
				 to='/login'>
					<button> LOGIN </button>
				</Link>
			</div>

			<div className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300'>
				<button>TEST ADMIN</button>
			</div>
		</div>
	)
}
