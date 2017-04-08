import {
	REQUEST_GET_GROUP,
	SUCCESS_GET_GROUP,
	FAILURE_GET_GROUP,
	REQUEST_QUERY_GROUPS,
	SUCCESS_QUERY_GROUPS,
	FAILURE_QUERY_GROUPS,
	REQUEST_CREATE_GROUP,
	SUCCESS_CREATE_GROUP,
	FAILURE_CREATE_GROUP,
	REQUEST_UPDATE_GROUP,
	SUCCESS_UPDATE_GROUP,
	FAILURE_UPDATE_GROUP
} from '../actions/group';

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created;
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated;
	}
	switch (action.type) {
		case REQUEST_GET_GROUP:
			return {
				...state,
				getting: true
			};
		case SUCCESS_GET_GROUP:
			delete state.getting;
			return {
				...state,
				group: action.payload
			};
		case FAILURE_GET_GROUP:
			delete state.getting;
			return {
				...state
			};
		case REQUEST_QUERY_GROUPS:
			return {
				...state,
				querying: true
			};
		case SUCCESS_QUERY_GROUPS:
			delete state.querying;
			return {
				...state,
				groups: action.payload
			};
		case FAILURE_QUERY_GROUPS:
			delete state.querying;
			return {
				...state
			};
		case REQUEST_CREATE_GROUP:
			return {
				...state,
				creating: true
			};
		case SUCCESS_CREATE_GROUP:
			delete state.creating;
			return {
				...state,
				created: true
			};
		case FAILURE_CREATE_GROUP:
			delete state.creating;
			return {
				...state
			};
		case REQUEST_UPDATE_GROUP:
			return {
				...state,
				updating: true
			};
		case SUCCESS_UPDATE_GROUP:
			delete state.updating;
			return {
				...state,
				updated: true
			};
		case FAILURE_UPDATE_GROUP:
			delete state.updating;
			return {
				...state
			};
		default:
			return state;
	}
};