import {SET_GUEST_TYPE, LOGIN, MY_PROFILE_TO_MOUNT, CURRENT_VISIT_DETAIL_ID} from './actions/action-types'


const initialstate =
{
	activeUser: false,
	guestType: null,
	myProfileToMount: null,
	currentVisitDetailId: null
}

const rootReducer = (state = initialstate, {type, payload}) => {
	switch (type){
		case SET_GUEST_TYPE:
			return {...state, guestType: payload};

		case LOGIN:
			return { ...state, activeUser: payload };
		
		case MY_PROFILE_TO_MOUNT:
			return { ...state, myProfileToMount: payload};
		
		case CURRENT_VISIT_DETAIL_ID:
			return { ...state, currentVisitDetailId: payload};

		default:
			return {...state};
	}
}

export default rootReducer
