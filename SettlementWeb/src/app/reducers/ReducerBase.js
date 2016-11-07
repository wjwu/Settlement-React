class ReducerBase {
	constructor(moduleName) {
		this.moduleName = moduleName
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
			case `BEGIN_GET_${this.moduleName}`:
				if (state.hasOwnProperty('result')) {
					delete state.result
				}
				return {
					...state,
					getting: true
				}
			case `END_GET_${this.moduleName}`:
				delete state.getting
				return {
					...state,
					result: action.result
				}
			case `ERROR_GET_${this.moduleName}`:
				delete state.getting
				return {
					...state
				}
			case `BEGIN_QUERY_${this.moduleName}`:
				return {
					...state,
					querying: true
				}
			case `END_QUERY_${this.moduleName}`:
				delete state.querying
				return {
					...state,
					version: action.version,
					result: action.result
				}
			case `ERROR_QUERY_${this.moduleName}`:
				delete state.querying
				return {
					...state
				}
			case `BEGIN_CREATE_${this.moduleName}`:
				return {
					...state,
					creating: true
				}
			case `END_CREATE_${this.moduleName}`:
				delete state.creating
				return {
					...state,
					created: true
				}
			case `ERROR_CREATE_${this.moduleName}`:
				delete state.creating
				return {
					...state
				}
			case `BEGIN_DELETE_${this.moduleName}`:
				return {
					...state,
					deleting: true
				}
			case `END_DELETE_${this.moduleName}`:
				delete state.deleting
				return {
					...state,
					deleted: true
				}
			case `ERROR_DELETE_${this.moduleName}`:
				delete state.deleting
				return {
					...state
				}
			case `BEGIN_UPDATE_${this.moduleName}`:
				return {
					...state,
					updating: true
				}
			case `END_UPDATE_${this.moduleName}`:
				delete state.updating
				return {
					...state,
					updated: true
				}
			case `ERROR_UPDATE_${this.moduleName}`:
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