import Styles from './DGuardDetail.module.css';

export const DGuardDetail = ( { gDetail, setOption } ) =>
{

    return(
        
        <div className={Styles.containerDetail}>

            <button className={Styles.backButton} onClick={ () => setOption('guards') }> {'<'} </button>

            <div className={Styles.detailContainer}>

                <div className={Styles.imgContainer}>
                    <img className={Styles.imgDetail} src={gDetail.profileImage ? gDetail.profileImage : "https://cdn-icons-png.flaticon.com/512/3361/3361201.png"} />
                </div>

                <div className={Styles.detailInfo}>
                    <div>
                        <h1 className={Styles.userName}> {gDetail.name} {gDetail.surname} </h1>
                        <h3 className={Styles.brandHolder}> Usuario: { gDetail.username } </h3>
                        <h3 className={Styles.brandHolder}> Contraseña: { gDetail.password } </h3>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className={Styles.detailSize}>

                        <h3 className={Styles.SizeLabel}> Email: { gDetail.email } </h3>

                        <button onClick={() => console.log("Usuario a detallar: ", gDetail) }> osea </button>

                    </div>
                </div>
            </div>

            <br />
            <hr />

            <div className={Styles.description}>
					<h3> Datos adicionales del guardia: </h3>
                    
			</div>

        </div>
    )
}