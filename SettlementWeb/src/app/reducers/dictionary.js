import * as actions from '../constants/dictionary'

const dictionary = (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated
	}
	switch (action.type) {
		case actions.BEGIN_GET_DICTIONARIES:
			return {
				...state,
				getting: true
			}
		case actions.END_GET_DICTIONARIES:
			delete state.getting
			return {
				...state,
				result: action.result
			}
		case actions.ERROR_GET_DICTIONARIES:
			delete state.getting
			return {
				...state
			}
		case actions.BEGIN_CREATE_DICTIONARY:
			return {
				...state,
				creating: true
			}
		case actions.END_CREATE_DICTIONARY:
			delete state.creating
			return {
				...state,
				created: true
			}
		case actions.ERROR_CREATE_DICTIONARY:
			delete state.creating
			return {
				...state
			}
		default:
			return state
	}
}

export default dictionary