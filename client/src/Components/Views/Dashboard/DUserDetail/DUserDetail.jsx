import Styles from './DUserDetail.module.css';

export const DUserDetail = ( { uDetail, setOption} ) =>
{
    //En realidad habría que traer al usuario por ID para que venga con las relacionales y mostrar todo.

    return(
        <div className={Styles.containerDetail}>

            <button className={Styles.backButton} onClick={ () => setOption('users') }> {'<'} </button>

            <div className={Styles.detailContainer}>

                <div className={Styles.imgContainer}>
                    <img className={Styles.imgDetail} src={ uDetail.profileImage ? uDetail.profileImage : "https://cdn-icons-png.flaticon.com/512/4172/4172718.png" } />
                </div>

                <div className={Styles.detailInfo}>
                    <div>
                        <h1 className={Styles.userName}> {uDetail.name} {uDetail.surname} </h1>
                        <h3 className={Styles.brandHolder}> Usuario: { uDetail.username } </h3>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className={Styles.detailSize}>

                        <h3 className={Styles.SizeLabel}> Email: { uDetail.email } </h3>

                        <label> Pregunta de seguridad: </label>
                        <h3 className={Styles.SizeLabel}> { uDetail.secQ } </h3>
                        <label> Respuesta de seguridad: </label>
                        <h3 className={Styles.SizeLabel}> { uDetail.secA } </h3>
                        <button onClick={() => console.log("Usuario a detallar: ", uDetail) }> osea </button>

                    </div>
                </div>
            </div>

            <br />
            <hr />

            <div className={Styles.description}>
					<h3> Imagenes que dió para probar que es residente (o texto similar): </h3>
                    { uDetail.reviewImages?.map( (x, y) => <p key={y}> {x} </p>) }
			</div>

        </div>
    )
}