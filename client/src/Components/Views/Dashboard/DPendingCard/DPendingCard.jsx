import Styles from './DPendingCard.module.css';

export const DPendingCard = ( {x, setUDetail, setOption} ) =>
{

    return(
        <div className={Styles.pendingCardContainer}>

            <div onClick={ () => { setOption('userDetail'); setUDetail(x); }}
                className={Styles.clickeable}>
                    <div>
                        <img src={x.profileImage ? x.profileImage : "https://cdn-icons-png.flaticon.com/512/4172/4172718.png"} />
                    </div>

                    <div className={Styles.cardName}>
                        <h2> {x.username} </h2>
                    </div>

                    <div>
                        <h1> {x.name} {x.surname} </h1>
                    </div>

                    <div>
                        <h1> { x.email } </h1>
                    </div>
            </div>
                
                <div>
                    <button> Desactivar </button>
                </div>

                <div>
                    <button> Eliminar </button>
                </div>

            <button onClick={() => console.log("USER DATA: ", x ) }> user data </button>
        </div>
    )
}