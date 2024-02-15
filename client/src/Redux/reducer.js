import {SET_GUEST_TYPE, LOGIN, MY_PROFILE_TO_MOUNT} from './actions/action-types'


const initialstate =
{
	activeUser: false,
	guestType: null,
	myProfileToMount: null,
}

const rootReducer = (state = initialstate, {type, payload}) => {
	switch (type){
		case SET_GUEST_TYPE:
			return {...state, guestType: payload};

		case LOGIN:
			return { ...state, activeUser: payload };
		
		case MY_PROFILE_TO_MOUNT:
			return { ...state, myProfileToMount: payload};

		default:
			return {...state};
	}
}

export default rootReducer
