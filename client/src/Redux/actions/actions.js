import {SET_GUEST_TYPE} from './action-types'

export const guestTypeAction = (type) => {
	return {
		type: SET_GUEST_TYPE,
		payload: type,
	}
}
