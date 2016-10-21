import * as client from '../apiClient'
import * as actions from '../constants/user'
import {
	SHOW_MESSAGE
} from '../constants/message'
const md5 = require('md5')

const API_PATH = 'user'

export const query = (groupId, pageIndex = 1, pageSize = 10) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_GET_USERS
		})
		let request = {
			pageIndex,
			pageSize,
			group: groupId
		}

		client.get(API_PATH, request).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_GET_USERS
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_GET_USERS,
					result: result
				})
			}
		})
	}
}

export const create = (user) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_CREATE_USER
		})

		user.password = md5(user.password)

		client.post(API_PATH, user).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_CREATE_USER
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_CREATE_USER
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'success',
					msg: '添加成功！'
				})
			}
		})
	}
}

export const update = (user) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_UPDATE_USER
		})

		client.put(API_PATH, user).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_UPDATE_USER
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_UPDATE_USER
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'success',
					msg: '修改成功！'
				})
			}
		})
	}
}