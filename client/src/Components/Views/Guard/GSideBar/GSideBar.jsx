import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setOption } from "../../../../Redux/actions/actions";

export const GSideBar = () =>
{
    const dispatch = useDispatch();

    return(
        <div>
            | |
            <Link to='/guard'>
                <button onClick={ () => setOption(dispatch, 'main')}> INICIO </button>
            </Link>
            | |
            <Link to='/guard/users'>
                <button onClick={ () => setOption(dispatch, 'users')}> USUARIOS </button>
            </Link>
            | |
        </div>
    )
}