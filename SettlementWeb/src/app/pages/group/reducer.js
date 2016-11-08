import {
	BEGIN_QUERY_GROUP,
	END_QUERY_GROUP,
	ERROR_QUERY_GROUP,
	BEGIN_QUERY_USER,
	END_QUERY_USER,
	ERROR_QUERY_USER,
	BEGIN_CREATE_GROUP,
	END_CREATE_GROUP,
	ERROR_CREATE_GROUP,
	BEGIN_UPDATE_GROUP,
	END_UPDATE_GROUP,
	ERROR_UPDATE_GROUP,
	BEGIN_CREATE_USER,
	END_CREATE_USER,
	ERROR_CREATE_USER,
	BEGIN_UPDATE_USER,
	END_UPDATE_USER,
	ERROR_UPDATE_USER
} from './action'

export default (state = {}, action) => {
	if (state.hasOwnProperty('createdGroup')) {
		delete state.createdGroup
	}
	if (state.hasOwnProperty('updatedGroup')) {
		delete state.updatedGroup
	}
	if (state.hasOwnProperty('createdUser')) {
		delete state.createdUser
	}
	if (state.hasOwnProperty('updatedUser')) {
		delete state.updatedUser
	}
	switch (action.type) {
		case BEGIN_QUERY_GROUP:
			return {
				...state,
				queryingGroups: true
			}
		case END_QUERY_GROUP:
			delete state.queryingGroups
			return {
				...state,
				groups: action.result
			}
		case ERROR_QUERY_GROUP:
			delete state.queryingGroups
			return {
				...state
			}
		case BEGIN_QUERY_USER:
			return {
				...state,
				queryingUsers: true
			}
		case END_QUERY_USER:
			delete state.queryingUsers
			return {
				...state,
				users: action.result
			}
		case ERROR_QUERY_USER:
			delete state.queryingUsers
			return {
				...state
			}
		case BEGIN_CREATE_GROUP:
			return {
				...state,
				creatingGroup: true
			}
		case END_CREATE_GROUP:
			delete state.creatingGroup
			return {
				...state,
				createdGroup: true
			}
		case ERROR_CREATE_GROUP:
			delete state.creatingGroup
			return {
				...state
			}
		case BEGIN_UPDATE_GROUP:
			return {
				...state,
				updatingGroup: true
			}
		case END_UPDATE_GROUP:
			delete state.updatingGroup
			return {
				...state,
				updatedGroup: true
			}
		case ERROR_UPDATE_GROUP:
			delete state.updatingGroup
			return {
				...state
			}
		case BEGIN_CREATE_USER:
			return {
				...state,
				creatingUser: true
			}
		case END_CREATE_USER:
			delete state.creatingUser
			return {
				...state,
				createdUser: true
			}
		case ERROR_CREATE_USER:
			delete state.creatingUser
			return {
				...state
			}
		case BEGIN_UPDATE_USER:
			return {
				...state,
				updatingUser: true
			}
		case END_UPDATE_USER:
			delete state.updatingUser
			return {
				...state,
				updatedUser: true
			}
		case ERROR_UPDATE_USER:
			delete state.updatingUser
			return {
				...state
			}
		default:
			return state
	}
}