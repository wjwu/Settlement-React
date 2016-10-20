import * as client from '../apiClient'
import * as actions from '../constants/user'
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
		let promise = client.get('user', request)

		promise.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				dispatch({
					type: actions.ERROR_GET_USERS
				})
			}
		}).then(result => {
			dispatch({
				type: actions.END_GET_USERS,
				result: result
			})
		})
	}
}

export const create = (user) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_CREATE_USER
		})

		user.password = md5(user.password)

		let promise = client.post(API_PATH, user)

		promise.then(response => {
			if (response.ok) {
				dispatch({
					type: actions.END_CREATE_USER
				})
			} else {
				dispatch({
					type: actions.ERROR_CREATE_USER
				})
			}
		})
	}
}