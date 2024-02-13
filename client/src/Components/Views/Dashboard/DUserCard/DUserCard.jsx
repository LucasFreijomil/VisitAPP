import Styles from './DUserCard.module.css';

export const DUserCard = ( { x } ) =>
{

    return(
        <div className={Styles.userContainer}>
            Soy el user card
            <button onClick={() => console.log("This user: ", x)}> This User </button>
        </div>
        
    )
}

