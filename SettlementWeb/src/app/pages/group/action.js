import * as apiClient from '../../apiClient'
import {
	SHOW_MESSAGE
} from '../../constants/message'

export const BEGIN_QUERY_GROUP = 'BEGIN_QUERY_GROUP'
export const END_QUERY_GROUP = 'END_QUERY_GROUP'
export const ERROR_QUERY_GROUP = 'ERROR_QUERY_GROUP'
export const BEGIN_QUERY_USER = 'BEGIN_QUERY_USER'
export const END_QUERY_USER = 'END_QUERY_USER'
export const ERROR_QUERY_USER = 'ERROR_QUERY_USER'
export const BEGIN_CREATE_GROUP = 'BEGIN_CREATE_GROUP'
export const END_CREATE_GROUP = 'END_CREATE_GROUP'
export const ERROR_CREATE_GROUP = 'ERROR_CREATE_GROUP'
export const BEGIN_UPDATE_GROUP = 'BEGIN_UPDATE_GROUP'
export const END_UPDATE_GROUP = 'END_UPDATE_GROUP'
export const ERROR_UPDATE_GROUP = 'ERROR_UPDATE_GROUP'
export const BEGIN_CREATE_USER = 'BEGIN_CREATE_USER'
export const END_CREATE_USER = 'END_CREATE_USER'
export const ERROR_CREATE_USER = 'ERROR_CREATE_USER'
export const BEGIN_UPDATE_USER = 'BEGIN_UPDATE_USER'
export const END_UPDATE_USER = 'END_UPDATE_USER'
export const ERROR_UPDATE_USER = 'ERROR_UPDATE_USER'

export const queryGroups = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_GROUP
		})
		apiClient.get('group', request).then(result => {
			dispatch({
				type: END_QUERY_GROUP,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_GROUP
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const queryUsers = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_USER
		})
		apiClient.get('user', request).then(result => {
			dispatch({
				type: END_QUERY_USER,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_USER
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

export const createUser = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_CREATE_USER,
		})
		apiClient.post('user', request).then(result => {
			dispatch({
				type: END_CREATE_USER,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '添加成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_CREATE_USER
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const updateUser = (request) => {
	return dispatch => {
		dispatch({
			type: BEGIN_UPDATE_USER,
		})
		apiClient.put('user', request).then(result => {
			dispatch({
				type: END_UPDATE_USER,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '修改成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_UPDATE_USER
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}