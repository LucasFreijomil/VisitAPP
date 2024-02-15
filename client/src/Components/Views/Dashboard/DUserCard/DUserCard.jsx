import { useState } from 'react';
import { deleteUser, disapproveUser } from '../../../../Redux/actions/actions';
import Styles from './DUserCard.module.css';

export const DUserCard = ( { x, setUDetail, setOption } ) =>
{
    const [ disapproved, setDisapproved ] = useState(false);
    const [ deleted, setDeleted ] = useState(false);

    return(
        <div className={Styles.userCardContainer}>

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
                
                {!deleted && <div class={!disapproved ? 'bg-red-400' : 'bg-green-400'}>
                    {!disapproved && <button onClick={() => { disapproveUser(x.id); setDisapproved(true); } }> Deshabilitar </button>}
                    {disapproved && <button disabled> DESHABILITADO </button>}
                </div>}

                <div class={!deleted ? 'bg-gray-400' : 'bg-red-400'}>
                    {!deleted && <button onClick={() => { deleteUser(x.id); setDeleted(true); } }> Eliminar </button>}
                    {deleted && <button disabled> ELIMINADO </button>}
                </div>

        </div>
        
    )
}

