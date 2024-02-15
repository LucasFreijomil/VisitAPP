import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMyProfileComponent } from '../../../Redux/actions/actions';
import { VisitCardList } from '../../VisitCardList/VisitCardList';
import { Link } from 'react-router-dom';

export const MyProfile = () => {
	const dispatch = useDispatch();
	const { myProfileToMount } = useSelector((state) => state);

	return (
		<div className='flex flex-col m-10 gap-4'>
			<div className='flex justify-center gap-4'>
				<div>
					<Link
						className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
						to='/createvisit'>
						<button> Crear Visita </button>
					</Link>
				</div>
				<div className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
					<button onClick={() => dispatch(setMyProfileComponent('My visits'))}>Mis Visitas</button>
				</div>
			</div>
			{myProfileToMount == 'My visits' && <VisitCardList />}
		</div>
	);
};
