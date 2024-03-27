import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EmployeeCard } from '../EmployeeCard/EmployeeCard';
import { VisitCard } from '../VisitCard/VisitCard';
import { decodeUser } from '../../Redux/actions/actions';

export const VisitCardList = () => {
	const [visits, setVisits] = useState(false);
	const [employees, setEmployees] = useState(false);
	const [refreshData, setRefreshData] = useState(false)

	const dispatch = useDispatch();

	useEffect(() => {
		decodeUser( JSON.parse( window.localStorage.getItem('activeUser') ) )
			.then( ( data ) =>
			{
				dispatch(data);
				setVisits(data.payload?.Visitas);
				setEmployees(data.payload?.Employees)
			})
			.catch( ( error ) =>
			{
				console.log("Error al logear usuario, promesa app.jsx: ", error);
			})

	}, [refreshData]);

	return (
		<div className='grid grid-cols-3 gap-3'>
			<div className='flex flex-col gap-3'>
			Visitas:
			{visits && visits.map((x, y) => <VisitCard refreshData={refreshData} setRefreshData={setRefreshData} key={y} props={x} />)}
			</div>
			<div className='flex flex-col gap-3'>
			Empleados:
			{employees && employees.map((x, y) => <EmployeeCard refreshData={refreshData} setRefreshData={setRefreshData} key={y} props={x} />)}
			</div>
			<div className='flex flex-col gap-3'>
			Proveedores:
			
			</div>
			
		</div>
	);
};
