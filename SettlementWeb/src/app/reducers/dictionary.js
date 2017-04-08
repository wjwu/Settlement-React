import {
	REQUEST_QUERY_BASES,
	SUCCESS_QUERY_BASES,
	FAILURE_QUERY_BASES,
	REQUEST_QUERY_SOURCES,
	SUCCESS_QUERY_SOURCES,
	FAILURE_QUERY_SOURCES,
	REQUEST_QUERY_COSTS,
	SUCCESS_QUERY_COSTS,
	FAILURE_QUERY_COSTS,
	REQUEST_CREATE_DICTIONARY,
	SUCCESS_CREATE_DICTIONARY,
	FAILURE_CREATE_DICTIONARY,
	REQUEST_UPDATE_DICTIONARY,
	SUCCESS_UPDATE_DICTIONARY,
	FAILURE_UPDATE_DICTIONARY
} from '../actions/dictionary';

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created;
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated;
	}
	switch (action.type) {
		case REQUEST_QUERY_BASES:
			return {
				...state,
				queryingBases: true
			};
		case SUCCESS_QUERY_BASES:
			delete state.queryingBases;
			return {
				...state,
				bases: action.payload
			};
		case FAILURE_QUERY_BASES:
			delete state.queryingBases;
			return {
				...state
			};
		case REQUEST_QUERY_SOURCES:
			return {
				...state,
				queryingSources: true
			};
		case SUCCESS_QUERY_SOURCES:
			delete state.queryingSources;
			return {
				...state,
				sources: action.payload
			};
		case FAILURE_QUERY_SOURCES:
			delete state.queryingSources;
			return {
				...state
			};
		case REQUEST_QUERY_COSTS:
			return {
				...state,
				queryingCosts: true
			};
		case SUCCESS_QUERY_COSTS:
			delete state.queryingCosts;
			return {
				...state,
				costs: action.payload
			};
		case FAILURE_QUERY_COSTS:
			delete state.queryingCosts;
			return {
				...state
			};
		case REQUEST_CREATE_DICTIONARY:
			return {
				...state,
				creating: true
			};
		case SUCCESS_CREATE_DICTIONARY:
			delete state.creating;
			return {
				...state,
				created: true
			};
		case FAILURE_CREATE_DICTIONARY:
			delete state.creating;
			return {
				...state
			};
		case REQUEST_UPDATE_DICTIONARY:
			return {
				...state,
				updating: true
			};
		case SUCCESS_UPDATE_DICTIONARY:
			delete state.updating;
			return {
				...state,
				updated: true
			};
		case FAILURE_UPDATE_DICTIONARY:
			delete state.updating;
			return {
				...state
			};
		default:
			return state;
	}
};