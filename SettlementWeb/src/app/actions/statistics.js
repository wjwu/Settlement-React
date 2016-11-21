import * as apiClient from '../apiClient'
import {
	SHOW_MESSAGE
} from '../constants/message'
import {
	BEGIN_QUERY_STATISTICS,
	END_QUERY_STATISTICS,
	ERROR_QUERY_STATISTICS
} from '../constants/statistics'

export const queryStats = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_STATISTICS
		})
		apiClient.get('statistics', request).then(result => {
			dispatch({
				type: END_QUERY_STATISTICS,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_STATISTICS
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const queryUserStats = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_STATISTICS
		})
		apiClient.get('user/statistics', request).then(result => {
			dispatch({
				type: END_QUERY_STATISTICS,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_STATISTICS
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}