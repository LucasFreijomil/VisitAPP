import { useDispatch } from 'react-redux';
import { setMyProfileComponent, setCurrentVisitId } from '../../Redux/actions/actions';
import Swal from 'sweetalert2';

export const VisitCard = ({ props }) => {
	const dispatch = useDispatch();

	const cartelito = () => {
		Swal.fire({
			title: '¿Qué desea hacer con este item?',
			showCancelButton: true,
			showConfirmButton: false,
			showDenyButton: true,
			cancelButtonText: 'Cancelar',
			denyButtonText: 'Eliminarlo',
		}).then((result) => {
			if (result.isDenied) {
				// Código para la opción "Eliminar"
			}
		});
	};

	return (
		<div className=' flex-row p-2 h-36 bg-slate-300 rounded-lg cursor-pointer'>
			<button className=' bg-rose-700 w-6 h-6' onClick={() => cartelito()}>
				X
			</button>
			<div
				onClick={() => {
					dispatch(setMyProfileComponent('visit_detail'));
					dispatch(setCurrentVisitId(props.id));
				}}
				>
				<h3>
					{props.name}, {props.surname}
				</h3>
				<h4>{props.dni}</h4>
				{props.company && <p>{props.company}</p>}
				{props.work && <p>{props.work}</p>}
				{props.company && props.work && <p>Empleado</p>}
				{props.company && !props.work && <p>Proveedor</p>}
				{!props.company && !props.work && <p>Visita Estandar</p>}
			</div>
		</div>
	);
};