import * as actions from '../constants/group'

const group = (state = {
	getting: false,
	creating: false
}, action) => {
	switch (action.type) {
		case actions.BEGIN_GET_GROUPS:
			return {
				...state,
				getting: true
			}
		case actions.END_GET_GROUPS:
			return {
				...state,
				getting: false,
				result: action.result
			}
		case actions.ERROR_GET_GROUPS:
			return Object.assign({}, state, {
				getting: false,
				error: action.error
			})
		case actions.BEGIN_CREATE_GROUP:
			return {
				...state,
				creating: true
			}
		case actions.END_CREATE_GROUP:
			return {
				...state,
				creating: false
			}
		case actions.ERROR_CREATE_GROUP:
			return Object.assign({}, state, {
				creating: false
			})
		default:
			return state
	}
}

export default group