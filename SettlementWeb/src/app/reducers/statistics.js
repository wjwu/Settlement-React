import {
	REQUEST_QUERY_STATISTICS,
	SUCCESS_QUERY_STATISTICS,
	FAILURE_QUERY_STATISTICS,
	REQUEST_QUERY_USER_STATISTICS,
	SUCCESS_QUERY_USER_STATISTICS,
	FAILURE_QUERY_USER_STATISTICS
} from '../actions/statistics';

export default (state = {}, action) => {
	switch (action.type) {
		case REQUEST_QUERY_STATISTICS:
		case REQUEST_QUERY_USER_STATISTICS:
			return {
				...state,
				querying: true
			};
		case SUCCESS_QUERY_STATISTICS:
		case SUCCESS_QUERY_USER_STATISTICS:
			delete state.querying;
			return {
				...state,
				stats: action.payload
			};
		case FAILURE_QUERY_STATISTICS:
		case FAILURE_QUERY_USER_STATISTICS:
			delete state.querying;
			return {
				...state
			};
		default:
			return state;
	}
};