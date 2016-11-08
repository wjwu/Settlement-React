import {
	BEGIN_QUERY_BASES,
	END_QUERY_BASES,
	ERROR_QUERY_BASES,
	BEGIN_QUERY_SOURCES,
	END_QUERY_SOURCES,
	ERROR_QUERY_SOURCES,
	BEGIN_QUERY_COSTS,
	END_QUERY_COSTS,
	ERROR_QUERY_COSTS,
	BEGIN_CREATE_DICTIONARY,
	END_CREATE_DICTIONARY,
	ERROR_CREATE_DICTIONARY,
	BEGIN_UPDATE_DICTIONARY,
	END_UPDATE_DICTIONARY,
	ERROR_UPDATE_DICTIONARY
} from '../constants/dictionary'

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated
	}
	switch (action.type) {
		case BEGIN_QUERY_BASES:
			return {
				...state,
				queryingBases: true
			}
		case END_QUERY_BASES:
			delete state.queryingBases
			return {
				...state,
				bases: action.result
			}
		case ERROR_QUERY_BASES:
			delete state.queryingBases
			return {
				...state
			}
		case BEGIN_QUERY_SOURCES:
			return {
				...state,
				queryingSources: true
			}
		case END_QUERY_SOURCES:
			delete state.queryingSources
			return {
				...state,
				sources: action.result
			}
		case ERROR_QUERY_SOURCES:
			delete state.queryingSources
			return {
				...state
			}
		case BEGIN_QUERY_COSTS:
			return {
				...state,
				queryingCosts: true
			}
		case END_QUERY_COSTS:
			delete state.queryingCosts
			return {
				...state,
				costs: action.result
			}
		case ERROR_QUERY_COSTS:
			delete state.queryingCosts
			return {
				...state
			}
		case BEGIN_CREATE_DICTIONARY:
			return {
				...state,
				creating: true
			}
		case END_CREATE_DICTIONARY:
			delete state.creating
			return {
				...state,
				created: true
			}
		case ERROR_CREATE_DICTIONARY:
			delete state.creating
			return {
				...state
			}
		case BEGIN_UPDATE_DICTIONARY:
			return {
				...state,
				updating: true
			}
		case END_UPDATE_DICTIONARY:
			delete state.updating
			return {
				...state,
				updated: true
			}
		case ERROR_UPDATE_DICTIONARY:
			delete state.updating
			return {
				...state
			}
		default:
			return state
	}
}