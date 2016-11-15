import {
	BEGIN_QUERY_SHEETS,
	END_QUERY_SHEETS,
	ERROR_QUERY_SHEETS,
	BEGIN_GET_SHEET,
	END_GET_SHEET,
	ERROR_GET_SHEET,
	BEGIN_CREATE_SHEET,
	END_CREATE_SHEET,
	ERROR_CREATE_SHEET,
	BEGIN_UPDATE_SHEET,
	END_UPDATE_SHEET,
	ERROR_UPDATE_SHEET
} from '../constants/sheet'

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated
	}
	switch (action.type) {
		case BEGIN_QUERY_SHEETS:
			return {
				...state,
				querying: true
			}
		case END_QUERY_SHEETS:
			delete state.querying
			return {
				...state,
				sheets: action.result
			}
		case ERROR_QUERY_SHEETS:
			delete state.querying
			return {
				...state
			}
		case BEGIN_GET_SHEET:
			return {
				...state,
				getting: true
			}
		case END_GET_SHEET:
			delete state.getting
			return {
				...state,
				sheet: action.result
			}
		case ERROR_GET_SHEET:
			delete state.getting
			return {
				...state
			}
		case BEGIN_CREATE_SHEET:
			return {
				...state,
				creating: true
			}
		case END_CREATE_SHEET:
			delete state.creating
			return {
				...state,
				created: true
			}
		case ERROR_CREATE_SHEET:
			delete state.creating
			return {
				...state
			}
		case BEGIN_UPDATE_SHEET:
			return {
				...state,
				updating: true
			}
		case END_UPDATE_SHEET:
			delete state.updating
			return {
				...state,
				updated: true
			}
		case ERROR_UPDATE_SHEET:
			delete state.updating
			return {
				...state
			}
		default:
			return state
	}
}