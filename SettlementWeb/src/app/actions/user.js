import * as apiClient from '../apiClient'
import {
	SHOW_MESSAGE
} from '../constants/message'
import {
	BEGIN_QUERY_USERS,
	END_QUERY_USERS,
	ERROR_QUERY_USERS,
	BEGIN_CREATE_USER,
	END_CREATE_USER,
	ERROR_CREATE_USER,
	BEGIN_UPDATE_USER,
	END_UPDATE_USER,
	ERROR_UPDATE_USER,
	BEGIN_UPDATE_USER_PWD,
	END_UPDATE_USER_PWD,
	ERROR_UPDATE_USER_PWD
} from '../constants/user'
const md5 = require('md5')

export const queryUsers = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_USERS
		})
		apiClient.get('user', request).then(result => {
			dispatch({
				type: END_QUERY_USERS,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_USERS
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const createUser = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_CREATE_USER,
		})
		request.password = md5(request.password)
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

export const updateUser = request => {
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

export const updateUserPwd = (request, success, error) => {
	return dispatch => {
		dispatch({
			type: BEGIN_UPDATE_USER_PWD,
		})
		request.oldPassword = md5(request.oldPassword)
		request.newPassword = md5(request.newPassword)
		apiClient.patch('user/password', request).then(result => {
			dispatch({
				type: END_UPDATE_USER_PWD,
				result: result
			})
			success()
				// dispatch({
				// 	type: SHOW_MESSAGE,
				// 	msgType: 'success',
				// 	msg: '修改成功！'
				// })
		}, error => {
			// dispatch({
			// 	type: ERROR_UPDATE_USER_PWD
			// })
			// dispatch({
			// 	type: SHOW_MESSAGE,
			// 	msgType: 'error',
			// 	msg: error
			// })
			error(error)
		})
	}
}