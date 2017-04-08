import {
	REQUEST_QUERY_USERS,
	SUCCESS_QUERY_USERS,
	FAILURE_QUERY_USERS,
	REQUEST_CREATE_USER,
	SUCCESS_CREATE_USER,
	FAILURE_CREATE_USER,
	REQUEST_UPDATE_USER,
	SUCCESS_UPDATE_USER,
	FAILURE_UPDATE_USER,
	REQUEST_UPDATE_USER_PWD,
	SUCCESS_UPDATE_USER_PWD,
	FAILURE_UPDATE_USER_PWD
} from '../actions/user';

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created;
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated;
	}
	switch (action.type) {
		case REQUEST_QUERY_USERS:
			return {
				...state,
				queryingUsers: true
			};
		case SUCCESS_QUERY_USERS:
			delete state.queryingUsers;
			return {
				...state,
				users: action.payload
			};
		case FAILURE_QUERY_USERS:
			delete state.queryingUsers;
			return {
				...state
			};
		case REQUEST_CREATE_USER:
			return {
				...state,
				creating: true
			};
		case SUCCESS_CREATE_USER:
			delete state.creating;
			return {
				...state,
				created: true
			};
		case FAILURE_CREATE_USER:
			delete state.creating;
			return {
				...state
			};
		case REQUEST_UPDATE_USER:
			return {
				...state,
				updating: true
			};
		case SUCCESS_UPDATE_USER:
			delete state.updating;
			return {
				...state,
				updated: true
			};
		case FAILURE_UPDATE_USER:
			delete state.updating;
			return {
				...state
			};
		case REQUEST_UPDATE_USER_PWD:
			return {
				...state,
				updatingPwd: true
			};
		case SUCCESS_UPDATE_USER_PWD:
			delete state.updatingPwd;
			return {
				...state
			};
		case FAILURE_UPDATE_USER_PWD:
			delete state.updatingPwd;
			return {
				...state
			};
		default:
			return state;
	}
};