import * as apiClient from '../apiClient'
import {
	SHOW_MESSAGE
} from '../constants/message'
import {
	BEGIN_QUERY_GROUPS,
	END_QUERY_GROUPS,
	ERROR_QUERY_GROUPS,
	BEGIN_CREATE_GROUP,
	END_CREATE_GROUP,
	ERROR_CREATE_GROUP,
	BEGIN_UPDATE_GROUP,
	END_UPDATE_GROUP,
	ERROR_UPDATE_GROUP
} from '../constants/group'

export const queryGroups = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_GROUPS
		})
		apiClient.get('group', request).then(result => {
			dispatch({
				type: END_QUERY_GROUPS,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_GROUPS
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const createGroup = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_CREATE_GROUP,
		})
		apiClient.post('group', request).then(result => {
			dispatch({
				type: END_CREATE_GROUP,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '添加成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_CREATE_GROUP
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const updateGroup = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_UPDATE_GROUP,
		})
		apiClient.put('group', request).then(result => {
			dispatch({
				type: END_UPDATE_GROUP,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '修改成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_UPDATE_GROUP
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const deleteGroup = (id) => {
	return () => {
		return apiClient.del(`group/${id}`)
	}
}