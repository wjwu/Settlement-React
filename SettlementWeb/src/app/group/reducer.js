import {
	BEGIN_GET_GROUPS,
	END_GET_GROUPS,
	BEGIN_GET_USERS,
	END_GET_USERS
} from './action'

const groupReducer = (state = {}, action) => {
	switch (action.type) {
		case BEGIN_GET_GROUPS:
			return {
				...state,
			}
		case END_GET_GROUPS:
			return {
				...state,
				loading: false,
				data: action.data
			}
		case BEGIN_GET_USERS:
			return {
				...state,
				users: action.users
			}
		case END_GET_USERS:
			return {
				...state,
				users: action.users
			}
		default:
			return {
				...state,
				loading: true,
			}
	}
}

export default groupReducer