import * as actions from '../constants/group'

const group = (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	switch (action.type) {
		case actions.BEGIN_GET_GROUPS:
			return {
				...state,
				getting: true
			}
		case actions.END_GET_GROUPS:
			delete state.getting
			return {
				...state,
				result: action.result
			}
		case actions.ERROR_GET_GROUPS:
			delete state.getting
			return {
				...state
			}
		case actions.BEGIN_CREATE_GROUP:
			return {
				...state,
				creating: true
			}
		case actions.END_CREATE_GROUP:
			delete state.creating
			return {
				...state,
				created: true
			}
		case actions.ERROR_CREATE_GROUP:
			delete state.creating
			return {
				...state
			}
		default:
			return state
	}
}

export default group