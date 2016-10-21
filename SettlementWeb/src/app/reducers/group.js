import * as actions from '../constants/group'

const group = (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated
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
			// case actions.BEGIN_DELETE_GROUP:
			// 	return {
			// 		...state,
			// 		deleting: true
			// 	}
			// case actions.END_DELETE_GROUP:
			// 	delete state.deleting
			// 	return {
			// 		...state,
			// 		deleted: true
			// 	}
			// case actions.ERROR_DELETE_GROUP:
			// 	delete state.deleting
			// 	return {
			// 		...state
			// 	}
		case actions.BEGIN_UPDATE_GROUP:
			return {
				...state,
				updating: true
			}
		case actions.END_UPDATE_GROUP:
			delete state.updating
			return {
				...state,
				updated: true
			}
		case actions.ERROR_UPDATE_GROUP:
			delete state.updating
			return {
				...state
			}
		default:
			return state
	}
}

export default group