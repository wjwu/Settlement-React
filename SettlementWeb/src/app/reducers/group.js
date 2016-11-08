import {
	BEGIN_QUERY_GROUPS,
	END_QUERY_GROUPS,
	ERROR_QUERY_GROUPS,
	BEGIN_CREATE_GROUP,
	END_CREATE_GROUP,
	ERROR_CREATE_GROUP,
	BEGIN_UPDATE_GROUP,
	END_UPDATE_GROUP,
	ERROR_UPDATE_GROUP
} from '../constants/group'

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated
	}
	switch (action.type) {
		case BEGIN_QUERY_GROUPS:
			return {
				...state,
				queryingGroups: true
			}
		case END_QUERY_GROUPS:
			delete state.queryingGroups
			return {
				...state,
				groups: action.result
			}
		case ERROR_QUERY_GROUPS:
			delete state.queryingGroups
			return {
				...state
			}
		case BEGIN_CREATE_GROUP:
			return {
				...state,
				creating: true
			}
		case END_CREATE_GROUP:
			delete state.creating
			return {
				...state,
				created: true
			}
		case ERROR_CREATE_GROUP:
			delete state.creating
			return {
				...state
			}
		case BEGIN_UPDATE_GROUP:
			return {
				...state,
				updating: true
			}
		case END_UPDATE_GROUP:
			delete state.updating
			return {
				...state,
				updated: true
			}
		case ERROR_UPDATE_GROUP:
			delete state.updating
			return {
				...state
			}
		default:
			return state
	}
}