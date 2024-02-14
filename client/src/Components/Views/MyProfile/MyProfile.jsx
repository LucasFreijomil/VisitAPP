import { Link } from 'react-router-dom';

export const MyProfile = () => {
    const getAllVisits = () => 
    {
        
    }
	return (
		<div className='flex gap-4'>
			<div>
				<Link
					className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
					to='/createvisit'>
					<button> Crear Visita </button>
				</Link>
			</div>
			<div>
				<Link className=' flex justify-center w-36 h-9 transition rounded-md ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
					<button> Mis Visitas </button>
				</Link>
			</div>
		</div>
	);
};
