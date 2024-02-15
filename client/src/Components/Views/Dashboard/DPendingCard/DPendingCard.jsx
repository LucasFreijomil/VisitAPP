import { useState } from 'react';
import { approveUser, deleteUser } from '../../../../Redux/actions/actions.js';
import Styles from './DPendingCard.module.css';

export const DPendingCard = ( {x, setUDetail, setOption} ) =>
{
    const [approved, setApproved] = useState(false);
    const [deleted, setDeleted] = useState(false);

    return(
        <div className={Styles.pendingCardContainer}>

            <div onClick={ () => { setOption('pendingUserDetail'); setUDetail(x); }}
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
                
                {!deleted && <div class={!approved ? 'bg-red-400' : 'bg-green-400'}>
                    {!approved && <button onClick={() => { approveUser(x.id); setApproved(true); } }> Aprobar </button>}
                    {approved && <button disabled> APROBADO </button>}
                </div>}

                <div class={!deleted ? 'bg-gray-400' : 'bg-red-400'}>
                    {!deleted && <button onClick={() => { deleteUser(x.id); setDeleted(true); } }> Eliminar </button>}
                    {deleted && <button disabled> ELIMINADO </button>}
                </div>

        </div>
    )
}
