import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VisitCard } from '../VisitCard/VisitCard';

export const VisitCardList = () => {
	const [visits, setVisits] = useState(false);
	const { activeUser } = useSelector((state) => state)

	useEffect(() => {
		axios
			.get(`http://localhost:3001/users?id=${activeUser.id}`)
			.then(({ data }) => {
				console.log('Success fetching visits', data);
				setVisits(data.Visitas);
			})
			.catch((error) => {
				console.log('Error bringing visits: ', error);
			});
	}, []);

	return (
		<div className='grid grid-cols-3 gap-3'>
			{visits && visits.map((x, y) => <VisitCard key={y} props={x} />)}
		</div>
	);
};
