import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteUser, disapproveUser } from '../../../../Redux/actions/actions';
import Styles from './DUserCard.module.css';

export const DUserCard = ( { x } ) =>
{
    const [ disapproved, setDisapproved ] = useState(false);
    const [ deleted, setDeleted ] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const seeDetail = () =>
    {
        let urlParams = new URLSearchParams();
            urlParams.set( 'id', x.id );
            navigate(window.location.pathname + '?' + urlParams.toString() );
        // if(location.pathname=='/dashboard')
        // {
        //     setOption(dispatch, 'userDetail');
        //     setUDetail(dispatch, x);
        // }
        // else
        // {
        //     let urlParams = new URLSearchParams();
        //     urlParams.set( 'id', x.id );
        //     navigate(window.location.pathname + '?' + urlParams.toString() );
        // }
    }

    return(
        <div className={Styles.userCardContainer}>
            
            <div onClick={seeDetail}
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
                
                {location.pathname=='/dashboard' &&
                (!deleted && <div class={!disapproved ? 'bg-red-400' : 'bg-green-400'}>
                    {!disapproved && <button onClick={() => { disapproveUser(x.id); setDisapproved(true); } }> Deshabilitar </button>}
                    {disapproved && <button disabled> DESHABILITADO </button>}
                </div>)
                }

                {location.pathname=='/dashboard' &&
                (<div class={!deleted ? 'bg-gray-400' : 'bg-red-400'}>
                    {!deleted && <button onClick={() => { deleteUser(x.id); setDeleted(true); } }> Eliminar </button>}
                    {deleted && <button disabled> ELIMINADO </button>}
                </div>)
                }

        </div>
        
    )
}

