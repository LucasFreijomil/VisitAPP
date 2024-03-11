import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveUser, deleteUser, pendingToApprove } from '../../../../Redux/actions/actions.js';
import Styles from './DPendingCard.module.css';

export const DPendingCard = ( {x, setUDetail, setOption} ) =>
{
    const dispatch = useDispatch();
    const [approved, setApproved] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const deleteThisUser = async () =>
    {
        await deleteUser(x.id);
        await pendingToApprove(dispatch);
        setDeleted(true);
    }

    const approveThisUser = async () =>
    {
        await approveUser(x.id);
        await pendingToApprove(dispatch);
        setApproved(true);
    }

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
                
                {!deleted && <div class={'bg-green-400'}>
                    <button onClick={approveThisUser} > Aprobar </button>
                </div>}

                <div class={'bg-red-400'}>
                    <button onClick={deleteThisUser} > Eliminar </button>
                </div>

        </div>
    )
}
