import { useState } from 'react';
import { deleteGuard, switchGuard } from '../../../../Redux/actions/actions.js';
import Styles from './DGuardCard.module.css';

export const DGuardCard = ( {x, setGDetail, setOption} ) =>
{
    const [active, setActive] = useState(x.active);
    const [deleted, setDeleted] = useState(false);

    return(
        <div className={Styles.pendingCardContainer}>

            <div onClick={ () => { setOption('guardDetail'); setGDetail(x); }}
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
                
                {!deleted &&
                <div class={active ? 'bg-red-400' : 'bg-green-400'}>
                    {active && <button onClick={() => { switchGuard(x.id); setActive(!active); } }> Desactivar </button>}
                    {!active && <button onClick={() => { switchGuard(x.id); setActive(!active); } }> Activar </button>}
                </div>}

                <div class={!deleted ? 'bg-gray-400' : 'bg-red-400'}>
                    {!deleted && <button onClick={() => { deleteGuard(x.id); setDeleted(true); } }> Eliminar </button>}
                    {deleted && <button disabled> ELIMINADO </button>}
                </div>

        </div>
    )
}
