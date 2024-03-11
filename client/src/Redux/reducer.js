import { CURRENT_VISIT_DETAIL_ID, FOUND_BY_SEARCH, GUARD_VIEW, LOGIN, LOG_GUARD, MY_PROFILE_TO_MOUNT, REFRESH_TOAPPROVE, REFRESH_USERS, SET_GUEST_TYPE, USER_DETAIL } from './actions/action-types';


const initialstate =
{
	activeUser: false,
	activeGuard: false,
	guestType: null,
	myProfileToMount: null,
	//	GUARDIA
	guardView: 'main',
	uDetail: false,
	foundBySearch: 'false',
		//REFRESH
	//usersToApprove
	toApprove: false,
	//usersInGeneral
	refreshUsers: false,
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
			//	usersToApprove
		case REFRESH_TOAPPROVE:
			return { ...state, toApprove: payload };
			//	refreshUsers
		case REFRESH_USERS:
			return { ...state, refreshUsers: payload };
			//	GUARDIA
		case GUARD_VIEW:
			return { ...state, guardView: payload };
		case USER_DETAIL:
			return { ...state, uDetail: payload };
		case FOUND_BY_SEARCH:
			return { ...state, foundBySearch: payload };
		
		case CURRENT_VISIT_DETAIL_ID:
			return { ...state, currentVisitDetailId: payload};

		default:
			return {...state};
	}
}

export default rootReducer
