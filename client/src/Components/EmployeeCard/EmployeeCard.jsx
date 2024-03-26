import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setCurrentVisitId, setMyProfileComponent } from '../../Redux/actions/actions';

export const EmployeeCard = ({ props, refreshData, setRefreshData }) => {
	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.activeUser)
	const url = "http://localhost:3001/"

	const cartelito = () => {
		Swal.fire({
			title: '¿Qué desea hacer con este item?',
			showCancelButton: true,
			showConfirmButton: false,
			showDenyButton: true,
			cancelButtonText: 'Cancelar',
			denyButtonText: 'Eliminarlo',
		}).then( async (result) => {
			if (result.isDenied) {
				try {
					const { data } = await axios.delete(`${url}employees?dni=${props.dni}&id=${activeUser.id}`);
					alert("Empleado desvinculado satisfactoriamente!")
					!refreshData ? setRefreshData(true) : setRefreshData(false)
					console.log(data)
				} catch (error) {
					alert(`Error al desvincular la visita ${props.name} ${props.surname} DNI ${props.dni}`)
      				console.error(`Error al desvincular la visita ${props.name} ${props.surname} DNI ${props.dni}`, error)
				}
			}
		});
	};

	return (
		<div className=' flex-row p-2 h-36 bg-stone-400 rounded-lg cursor-pointer'>
			<button className=' bg-rose-700 w-6 h-6' onClick={() => cartelito()}>
				X
			</button>
			<div
				onClick={() => {
					dispatch(setMyProfileComponent('employee_detail'));
					dispatch(setCurrentVisitId(props.dni));
				}}
				>
				<h3>
					{props.name}, {props.surname}
				</h3>
				<h4>{props.dni}</h4>
				<p>{props.labor}</p>
			</div>
		</div>
	);
};