import * as actions from '../constants/user'

const user = (state = {
	getting: false,
	creating: false
}, action) => {
	switch (action.type) {
		case actions.BEGIN_GET_USERS:
			return {
				...state,
				getting: true
			}
		case actions.END_GET_USERS:
			return {
				...state,
				getting: false,
				result: action.result
			}
		case actions.ERROR_GET_USERS:
			return Object.assign({}, state, {
				getting: false,
				error: error
			})
		case actions.BEGIN_CREATE_USER:
			return {
				...state,
				creating: true
			}
		case actions.END_CREATE_USER:
			return {
				...state,
				creating: false
			}
		case actions.ERROR_CREATE_USER:
			return Object.assign({}, state, {
				create: false,
				error: error
			})
		default:
			return state
	}
}

export default user