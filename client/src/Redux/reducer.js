import { CURRENT_VISIT_DETAIL_ID, GUARD_VIEW, LOGIN, LOG_GUARD, MY_PROFILE_TO_MOUNT, SET_GUEST_TYPE } from './actions/action-types';


const initialstate =
{
	activeUser: false,
	activeGuard: false,
	guestType: null,
	myProfileToMount: null,
	guardView: null,
	currentVisitDetailId: null
}

const rootReducer = (state = initialstate, {type, payload}) => {
	switch (type){
		case SET_GUEST_TYPE:
			return {...state, guestType: payload};

		case LOGIN:
			return { ...state, activeUser: payload };

		case LOG_GUARD:
			return { ...state, activeGuard: payload };
		
		case MY_PROFILE_TO_MOUNT:
			return { ...state, myProfileToMount: payload};

		case GUARD_VIEW:
			return { ...state, guardView: payload };
		
		case CURRENT_VISIT_DETAIL_ID:
			return { ...state, currentVisitDetailId: payload};

		default:
			return {...state};
	}
}

export default rootReducer
