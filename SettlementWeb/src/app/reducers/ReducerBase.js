class ReducerBase {
	constructor(moduleName, actionTypes) {
		this.moduleName = moduleName,
			this.actionTypes = actionTypes
	}

	reduce(state = {}, action) {
		if (state.hasOwnProperty('created')) {
			delete state.created
		}
		if (state.hasOwnProperty('updated')) {
			delete state.updated
		}
		if (state.hasOwnProperty('deleted')) {
			delete state.deleted
		}
		switch (action.type) {
			case this.actionTypes[`BEGIN_GET_${this.moduleName}`]:
				return {
					...state,
					getting: true
				}
			case this.actionTypes[`END_GET_${this.moduleName}`]:
				delete state.getting
				return {
					...state,
					result: action.result
				}
			case this.actionTypes[`ERROR_GET_${this.moduleName}`]:
				delete state.getting
				return {
					...state
				}
			case this.actionTypes[`BEGIN_QUERY_${this.moduleName}`]:
				return {
					...state,
					querying: true
				}
			case this.actionTypes[`END_QUERY_${this.moduleName}`]:
				delete state.querying
				return {
					...state,
					results: action.result
				}
			case this.actionTypes[`ERROR_QUERY_${this.moduleName}`]:
				delete state.querying
				return {
					...state
				}
			case this.actionTypes[`BEGIN_CREATE_${this.moduleName}`]:
				return {
					...state,
					creating: true
				}
			case this.actionTypes[`END_CREATE_${this.moduleName}`]:
				delete state.creating
				return {
					...state,
					created: true
				}
			case this.actionTypes[`ERROR_CREATE_${this.moduleName}`]:
				delete state.creating
				return {
					...state
				}
			case this.actionTypes[`BEGIN_DELETE_${this.moduleName}`]:
				return {
					...state,
					deleting: true
				}
			case this.actionTypes[`END_DELETE_${this.moduleName}`]:
				delete state.deleting
				return {
					...state,
					deleted: true
				}
			case this.actionTypes[`ERROR_DELETE_${this.moduleName}`]:
				delete state.deleting
				return {
					...state
				}
			case this.actionTypes[`BEGIN_UPDATE_${this.moduleName}`]:
				return {
					...state,
					updating: true
				}
			case this.actionTypes[`END_UPDATE_${this.moduleName}`]:
				delete state.updating
				return {
					...state,
					updated: true
				}
			case this.actionTypes[`ERROR_UPDATE_${this.moduleName}`]:
				delete state.updating
				return {
					...state
				}
			default:
				return state
		}
	}
}

export default ReducerBase