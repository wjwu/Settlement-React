import {
	BEGIN_GET_GROUPS,
	END_GET_GROUPS,
	BEGIN_GET_USERS,
	END_GET_USERS,
	BEGIN_CREATE_GROUP,
	END_CREATE_GROUP
} from './action'

const groupReducer = (state = {}, action) => {
	switch (action.type) {
		case BEGIN_GET_GROUPS:
			return {
				...state,
				groupsLoading: true
			}
		case END_GET_GROUPS:
			return {
				...state,
				groupsLoading: false,
				groups: action.groups
			}
		case BEGIN_GET_USERS:
			return Object.assign({}, state, {
				usersLoading: true
			})
		case END_GET_USERS:
			return Object.assign({}, state, {
				users: action.users,
				usersLoading: false
			})
		case BEGIN_CREATE_GROUP:
			return {
				...state,
				submittingGroup: true
			}
		case END_CREATE_GROUP:
			return {
				...state,
				submittingGroup: false
			}
		default:
			return state
	}
}

export default groupReducer