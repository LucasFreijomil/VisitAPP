import { LOGIN } from './actions/action-types.js';

const initialstate =
{
	activeUser: false,
}

const rootReducer = (state = initialstate, {type, payload}) => 
{
	switch (type)
    {
		case LOGIN:
			return { ...state, activeUser: payload };
		default:
			return {...state}
	}
}

export default rootReducer;