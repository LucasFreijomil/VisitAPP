import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Styles from './DUserDetail.module.css';

export const DUserDetail = () =>
{
    const [ thisUser, setThisUser ] = useState(false);
    const { uDetail } = useSelector( state => state );
    let url = "http://localhost:3001/";
    const location = useLocation();

    useEffect( () =>
    {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');

        axios.get(`${url}users?id=${id}`)
        .then( ( { data } ) =>
        {
            setThisUser( data );
        })
        .catch( ( error ) =>
        {
            console.log( "Error al traer el detalle de usuario: ", error );
        })
    }, [location.search])

    const handleBack = () =>
    {
        window.history.back();
    }

    return(
        <div className={Styles.containerDetail}>
            <button onClick={()=>console.log("thisUser: ", thisUser)}> detail </button>

            <button className={Styles.backButton} onClick={handleBack}> {'<'} </button>

            <div className={Styles.detailContainer}>

                <div className={Styles.imgContainer}>
                    <img className={Styles.imgDetail} src={ thisUser.profileImage ? thisUser.profileImage : "https://cdn-icons-png.flaticon.com/512/4172/4172718.png" } />
                </div>

                <div className={Styles.detailInfo}>
                    <div>
                        <h1 className={Styles.userName}> {thisUser.name} {thisUser.surname} </h1>
                        <h3 className={Styles.brandHolder}> Usuario: { thisUser.username } </h3>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className={Styles.detailSize}>

                        <h3 className={Styles.SizeLabel}> Email: { thisUser.email } </h3>

                        <label> Pregunta de seguridad: </label>
                        <h3 className={Styles.SizeLabel}> { thisUser.secQ } </h3>
                        <label> Respuesta de seguridad: </label>
                        <h3 className={Styles.SizeLabel}> { thisUser.secA } </h3>
                        <button onClick={() => console.log("Usuario a detallar: ", thisUser) }> osea </button>

                    </div>
                </div>
            </div>

            <br />
            <hr />

            {location.pathname=='dashboard' && (<div className={Styles.description}>
                <hr />
					<h3> Imagenes que dió para probar que es residente (o texto similar): </h3>
                    { uDetail.reviewImages?.map( (x, y) => <p key={y}> {x} </p>) }
			</div>)}

        </div>
    )
}