import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Calendario } from '../../Calendar/Calendar';
import { Messages } from '../../../Messages/Messages';
import Styles from './DUserDetail.module.css';

export const DUserDetail = () => {
	const [thisUser, setThisUser] = useState(false);
	const [showMessagesComponent, setShowMessagesComponent] = useState(false);
	const { uDetail } = useSelector((state) => state);
	let url = 'http://localhost:3001/';
	const location = useLocation();

	console.log('THIS USER EN DUSERDETAIL: ', thisUser);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const id = searchParams.get('id');

		axios
			.get(`${url}users?id=${id}`)
			.then(({ data }) => {
				setThisUser(data);
			})
			.catch((error) => {
				console.log('Error al traer el detalle de usuario: ', error);
			});
	}, [location.search]);

	const handleBack = () => 
    {
		window.history.back();
	};

	return (
		<div className={Styles.containerDetail}>
			{!showMessagesComponent ? (
				<div>
					<button onClick={() => console.log('thisUser: ', thisUser)}> detail </button>

					<button className={Styles.backButton} onClick={handleBack}>
						{'<'}
					</button>

					<div className={Styles.detailContainer}>
						<div className={Styles.imgContainer}>
							<img
								className={Styles.imgDetail}
								src={thisUser.profileImage ? thisUser.profileImage : 'https://cdn-icons-png.flaticon.com/512/4172/4172718.png'}
							/>
						</div>

						<div className={Styles.detailInfo}>
							<div>
								<h1 className={Styles.userName}>
									{thisUser.name} {thisUser.surname}
								</h1>
								<h3 className={Styles.brandHolder}> Usuario: {thisUser.username} </h3>
							</div>

							<br />
							<hr />
							<br />

							<div className={Styles.detailSize}>
								<h3 className={Styles.SizeLabel}> Email: {thisUser.email} </h3>

								<label> Pregunta de seguridad: </label>
								<h3 className={Styles.SizeLabel}> {thisUser.secQ} </h3>
								<label> Respuesta de seguridad: </label>
								<h3 className={Styles.SizeLabel}> {thisUser.secA} </h3>
								<button onClick={() => console.log('Usuario a detallar: ', thisUser)}> osea </button>
							</div>
							<div>
								<button class='bg-orange-500' onClick={() => setShowMessagesComponent(true)}>
									Enviar mensaje 📧
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Messages showMessagesComponent={showMessagesComponent} setShowMessagesComponent={setShowMessagesComponent} thisUser={thisUser} />
			)}

			<br />
			<hr />

			{thisUser && <Calendario thisUser={thisUser} />}

			{location.pathname == 'dashboard' && (
				<div className={Styles.description}>
					<hr />
					<h3> Imagenes que dió para probar que es residente (o texto similar): </h3>
					{uDetail.reviewImages?.map((x, y) => (
						<p key={y}> {x} </p>
					))}
				</div>
			)}
		</div>
	);
};
