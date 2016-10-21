import * as actions from '../constants/user'

const user = (state = {}, action) => {
	switch (action.type) {
		case actions.BEGIN_GET_USERS:
			return {
				...state,
				getting: true
			}
		case actions.END_GET_USERS:
			delete state.getting
			return {
				...state,
				result: action.result
			}
		case actions.ERROR_GET_USERS:
			delete state.getting
			return {
				...state
			}
		case actions.BEGIN_CREATE_USER:
			return {
				...state,
				creating: true
			}
		case actions.END_CREATE_USER:
			delete state.creating
			return {
				...state
			}
		case actions.ERROR_CREATE_USER:
			delete state.creating
			return {
				...state
			}
		default:
			return state
	}
}

export default user