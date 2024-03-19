import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteUser, disapproveUser, pendingToApprove, refreshUsersFromDb } from '../../../../Redux/actions/actions';
import Styles from './DUserCard.module.css';

export const DUserCard = ( { x } ) =>
{
    const refreshUsers = useSelector( state => state.refreshUsers );
    const dispatch = useDispatch();
    const activeGuard = useSelector( state => state.activeGuard );
    const location = useLocation();
    const navigate = useNavigate();

    const seeDetail = () =>
    {
        let urlParams = new URLSearchParams();
            urlParams.set( 'id', x.id );
            navigate(window.location.pathname + '?' + urlParams.toString() );
    }

    const disapproveThisUser = async () =>
    {
        await disapproveUser(x.id);
        await pendingToApprove(dispatch);
        refreshUsersFromDb(dispatch, !refreshUsers);
    }

    const deleteThisUser = async () =>
    {
        await deleteUser(x.id);
        await pendingToApprove(dispatch);
        refreshUsersFromDb(dispatch, !refreshUsers);
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
                    <button onClick={disapproveThisUser} > Deshabilitar </button>
                }

                {location.pathname=='/dashboard' &&
                    <button onClick={deleteThisUser} > Eliminar </button>
                }

        </div>
        
    )
}

