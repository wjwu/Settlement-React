import * as apiClient from '../apiClient'
import {
	SHOW_MESSAGE
} from '../constants/message'
import {
	BEGIN_QUERY_BASES,
	END_QUERY_BASES,
	ERROR_QUERY_BASES,
	BEGIN_QUERY_SOURCES,
	END_QUERY_SOURCES,
	ERROR_QUERY_SOURCES,
	BEGIN_QUERY_COSTS,
	END_QUERY_COSTS,
	ERROR_QUERY_COSTS,
	BEGIN_CREATE_DICTIONARY,
	END_CREATE_DICTIONARY,
	ERROR_CREATE_DICTIONARY,
	BEGIN_UPDATE_DICTIONARY,
	END_UPDATE_DICTIONARY,
	ERROR_UPDATE_DICTIONARY
} from '../constants/dictionary'

export const queryBases = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_BASES
		})
		if (request) {
			request.type = 'base'
		}
		apiClient.get('dictionary', request).then(result => {
			dispatch({
				type: END_QUERY_BASES,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_BASES
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const querySources = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_SOURCES
		})
		if (request) {
			request.type = 'source'
		}
		apiClient.get('dictionary', request).then(result => {
			dispatch({
				type: END_QUERY_SOURCES,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_SOURCES
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const queryCosts = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_COSTS
		})
		if (request) {
			request.type = 'cost'
		}
		apiClient.get('dictionary', request).then(result => {
			dispatch({
				type: END_QUERY_COSTS,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_COSTS
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const createDictionary = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_CREATE_DICTIONARY,
		})
		apiClient.post('dictionary', request).then(result => {
			dispatch({
				type: END_CREATE_DICTIONARY,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '添加成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_CREATE_DICTIONARY
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const updateDictionary = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_UPDATE_DICTIONARY,
		})
		apiClient.put('dictionary', request).then(result => {
			dispatch({
				type: END_UPDATE_DICTIONARY,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '修改成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_UPDATE_DICTIONARY
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}