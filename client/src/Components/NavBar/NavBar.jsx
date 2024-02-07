import { Link } from "react-router-dom"

export const NavBar = () =>
{

    return(
        <div>
            <Link to='/home'>
                <button> HOME </button>
            </Link>
            <Link to='/createuser'>
                <button> Create USER </button>
            </Link>
            <Link to='/createvisit'>
                <button> Create VISIT </button>
            </Link>
        </div>
    )
}