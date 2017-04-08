import {
	BEGIN_QUERY_STATISTICS,
	END_QUERY_STATISTICS,
	ERROR_QUERY_STATISTICS
} from '../actions/statistics'

export default (state = {}, action) => {
	switch (action.type) {
		case BEGIN_QUERY_STATISTICS:
			return {
				...state,
				querying: true
			}
		case END_QUERY_STATISTICS:
			delete state.querying
			return {
				...state,
				stats: action.result
			}
		case ERROR_QUERY_STATISTICS:
			delete state.querying
			return {
				...state
			}
		default:
			return state
	}
}