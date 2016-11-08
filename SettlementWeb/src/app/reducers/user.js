import {
	BEGIN_QUERY_USERS,
	END_QUERY_USERS,
	ERROR_QUERY_USERS,
	BEGIN_CREATE_USER,
	END_CREATE_USER,
	ERROR_CREATE_USER,
	BEGIN_UPDATE_USER,
	END_UPDATE_USER,
	ERROR_UPDATE_USER
} from '../constants/user'

export default (state = {}, action) => {
	if (state.hasOwnProperty('created')) {
		delete state.created
	}
	if (state.hasOwnProperty('updated')) {
		delete state.updated
	}
	switch (action.type) {
		case BEGIN_QUERY_USERS:
			return {
				...state,
				queryingUsers: true
			}
		case END_QUERY_USERS:
			delete state.queryingUsers
			return {
				...state,
				users: action.result
			}
		case ERROR_QUERY_USERS:
			delete state.queryingUsers
			return {
				...state
			}
		case BEGIN_CREATE_USER:
			return {
				...state,
				creating: true
			}
		case END_CREATE_USER:
			delete state.creating
			return {
				...state,
				created: true
			}
		case ERROR_CREATE_USER:
			delete state.creating
			return {
				...state
			}
		case BEGIN_UPDATE_USER:
			return {
				...state,
				updating: true
			}
		case END_UPDATE_USER:
			delete state.updating
			return {
				...state,
				updated: true
			}
		case ERROR_UPDATE_USER:
			delete state.updating
			return {
				...state
			}
		default:
			return state
	}
}