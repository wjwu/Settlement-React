import {
	REQUEST_GET_SHEET,
	SUCCESS_GET_SHEET,
	FAILURE_GET_SHEET,
	REQUEST_QUERY_SHEETS,
	SUCCESS_QUERY_SHEETS,
	FAILURE_QUERY_SHEETS,
	REQUEST_CREATE_SHEET,
	SUCCESS_CREATE_SHEET,
	FAILURE_CREATE_SHEET,
	REQUEST_UPDATE_SHEET,
	SUCCESS_UPDATE_SHEET,
	FAILURE_UPDATE_SHEET
} from '../actions/sheet';

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created;
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated;
	}
	switch (action.type) {
		case REQUEST_QUERY_SHEETS:
			return {
				...state,
				querying: true
			};
		case SUCCESS_QUERY_SHEETS:
			delete state.querying;
			return {
				...state,
				sheets: action.result
			};
		case FAILURE_QUERY_SHEETS:
			delete state.querying;
			return {
				...state
			};
		case REQUEST_GET_SHEET:
			return {
				...state,
				getting: true
			};
		case SUCCESS_GET_SHEET:
			delete state.getting;
			return {
				...state,
				sheet: action.result
			};
		case FAILURE_GET_SHEET:
			delete state.getting;
			return {
				...state
			};
		case REQUEST_CREATE_SHEET:
			return {
				...state,
				creating: true
			};
		case SUCCESS_CREATE_SHEET:
			delete state.creating;
			return {
				...state,
				created: true
			};
		case FAILURE_CREATE_SHEET:
			delete state.creating;
			return {
				...state
			};
		case REQUEST_UPDATE_SHEET:
			return {
				...state,
				updating: true
			};
		case SUCCESS_UPDATE_SHEET:
			delete state.updating;
			return {
				...state,
				updated: true
			};
		case FAILURE_UPDATE_SHEET:
			delete state.updating;
			return {
				...state
			};
		default:
			return state;
	}
};