import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setGuardComponent, setMyProfileComponent } from '../../Redux/actions/actions';

export const NavBar = () => {
	const { activeUser, activeGuard } = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div className=' bg-blue-600 flex justify-evenly items-center h-20 text-cyan-50'>
			<div>
				<Link
					className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
					to='/home'>
					<button> Home </button>
				</Link>
			</div>

			{ (!activeUser && !activeGuard) && (<div>
				<Link
					className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
					to='/createuser'>
					<button className=''> Crear Usuario</button>
				</Link>
			</div>)}

			{ activeUser && <button onClick={() => console.log('Active user:\n', activeUser)}>activeUser</button> }
			{ activeGuard && <button onClick={() => console.log('Active guard:\n', activeGuard)}>activeGuard</button> }

			{activeUser && activeUser.isAdmin && (
				<div>
					<Link
						className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
						to='/dashboard'>
						<button> Dashboard </button>
					</Link>
				</div>
			)}

		

			{ (!activeUser && !activeGuard) && (
				<div>
					<Link
						className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-slate-600 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300'
						to='/login'>
						<button> LOGIN </button>
					</Link>
				</div>
			)}

			{ (activeUser || activeGuard) && (
				<div>
					<Link
						className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-slate-600 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300'
						to='/home'>
						<button
							onClick={() => {
								window.localStorage.setItem('activeUser', JSON.stringify(null));
								window.localStorage.setItem('activeGuard', JSON.stringify(null));
								window.location.reload();
							}}>
							LogOut
						</button>
					</Link>
				</div>
			)}

			{activeUser && (
				<Link to='/myprofile'>
					<div className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300'>
						<button onClick={() => dispatch(setMyProfileComponent(null))} >Mi Perfil</button>
					</div>
				</Link>
			)}

			{activeGuard && (
				<Link to='/guard'>
					<div className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-black hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-black duration-300'>
						<button onClick={() => dispatch(setGuardComponent(null))} >Guardia</button>
					</div>
				</Link>
			)}
		</div>
	);
};
