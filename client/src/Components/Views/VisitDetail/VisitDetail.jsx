import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const VisitDetail = () => {
	const { currentVisitDetailId } = useSelector((state) => state);
	const [showVisit, setShowVisit] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:3001/visitas?id=${currentVisitDetailId}`)
			.then(({ data }) => {
				console.log(`Success fetching visit ${currentVisitDetailId}!`, data);
				setShowVisit(data);
			})
			.catch((error) => {
				console.log('Error geting visit: ', error);
			});
	}, []);

	return (
		<div className='w-full mt-10 flex justify-center'>
			<div className=' grid grid-cols-2 h-96 w-4/5 bg-slate-400 rounded-xl'>
                <div name='first-column ' className='flex flex-col justify-center items-center'>
                    <div name='photo-container' className=' w-56 h-56 border border-stone-950 flex flex-col justify-center items-center '>
                        Photo Container
                    </div>
                </div>
                <div name='second-column' className=' bg-slate-300 flex flex-col justify-evenly items-center rounded-r-xl'>
                <div className='flex flex-col gap-4'>
				<p className=' text-4xl'>Name: {showVisit?.name}, {showVisit?.surname}</p>
				<p className=' text-4xl'></p>
				<p className=' text-4xl'>DNI: {showVisit?.dni}</p>
				{showVisit?.work && (<p className=' text-4xl'>Work: {showVisit?.work}</p>)}
				{showVisit?.company && (<p className=' text-4xl'>Company: {showVisit?.company}</p>)}
                </div>
                </div>
			</div>
		</div>
	);
};
