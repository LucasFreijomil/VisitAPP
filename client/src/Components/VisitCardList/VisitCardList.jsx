import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { VisitCard } from '../VisitCard/VisitCard';

export const VisitCardList = () => {
	const [visits, setVisits] = useState(false);

	useEffect(() => {
		axios
			.get('http://localhost:3001/visitas')
			.then(({ data }) => {
				console.log('Success fetching visits');
				setVisits(data);
			})
			.catch((error) => {
				console.log('Error bringing visits: ', error);
			});
	}, []);

	return (
		<div>
			{visits && visits.map((x, y) => <VisitCard key={y} props={x} />)}
		</div>
	);
};
