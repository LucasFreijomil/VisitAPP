import {SET_GUEST_TYPE, LOGIN} from './actions/action-types'

const initialstate = 
{
	activeUser: false,
	guestType: null,
}

const rootReducer = (state = initialstate, {type, payload}) => {
	switch (type){
		case SET_GUEST_TYPE:
			return {...state, guestType: payload};

		case LOGIN:
			return { ...state, activeUser: payload };
		default:
			return {...state};
	}
}

export default rootReducer
