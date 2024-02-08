import {SET_GUEST_TYPE} from './actions/action-types'

const initialstate = {
	guestType: null,
}

const rootReducer = (state = initialstate, {type, payload}) => {
	switch (type) {
		case SET_GUEST_TYPE:
			return {...state, guestType: payload};

		default:
			return {...state};
	}
}

export default rootReducer;
