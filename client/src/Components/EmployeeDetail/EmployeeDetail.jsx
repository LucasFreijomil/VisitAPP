import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { modifyEmployee } from '../../Redux/actions/actions.js';

export const EmployeeDetail = () => {
	const { currentVisitDetailId } = useSelector((state) => state);
	const [employee, setEmployee] = useState(null);
	const [ editCompany, setEditCompany ] = useState(false);
	const [ editWork, setEditWork ] = useState(false);
	const [ input, setInput ] = useState(false)
    let url = "http://localhost:3001/";

	useEffect(() => {
		axios
			.get(`${url}employees?dni=${currentVisitDetailId}`)
			.then(({ data }) => {
				setEmployee(data);
			})
			.catch((error) => {
				console.log('Error geting visit: ', error);
			});
	}, []);

	const handleChange = e =>
    {
		const {name, value} = e.target;
		setInput( { [name]: value } );
	}

	const enviarCambios = ( form, dni ) =>
	{
		modifyEmployee(form, dni) && alert("¡Cambiado satisfactoriamente!");
	}

	return (
		<div className='w-full mt-10 flex justify-center'>
			<div className=' grid grid-cols-2 h-96 w-4/5 bg-slate-400 rounded-xl'>
                <div name='first-column ' className='flex flex-col justify-center items-center'>
                    <div name='photo-container' className=' w-56 h-56 border border-stone-950 flex flex-col justify-center items-center '>
                        <img src={employee?.img} />
                    </div>
                </div>
                <div name='second-column' className=' bg-slate-300 flex flex-col justify-evenly items-center rounded-r-xl'>
                <div className='flex flex-col gap-4'>
				<p className=' text-4xl'>Name: {employee?.name} {employee?.surname}</p>
				<p className=' text-4xl'></p>
				<p className=' text-4xl'>DNI: {employee?.dni}</p>
                <hr/>
                <h3 className=' text-2xl'>Responsabilidades:</h3>
                {employee?.labor &&
                <ul>
                    {employee.labor?.map((responsabilidad, index) => (
                    <li key={index}> • {responsabilidad}</li>
                    ))}
                </ul>}

                </div>
                </div>
			</div>
		</div>
	);
};
