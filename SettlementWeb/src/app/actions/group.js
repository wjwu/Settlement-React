import * as client from '../apiClient'
import * as actions from '../constants/group'
import {
	SHOW_MESSAGE
} from '../constants/message'

const API_PATH = 'group'

export const query = () => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_GET_GROUPS
		})

		let request = {
			pageIndex: 1
		}

		let promise = client.get(API_PATH, request)

		promise.then(response => {
			if (response.ok) {
				return response.json()
			} else {
				dispatch({
					type: actions.ERROR_GET_GROUPS
				})
			}
		}).then(result => {
			dispatch({
				type: actions.END_GET_GROUPS,
				result: result
			})
		})
	}
}

export const create = (parentId, name) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_CREATE_GROUP
		})

		let request = {
			parentId,
			name
		}

		let promise = client.post(API_PATH, request)

		promise.then(response => {
			if (response.ok) {
				dispatch({
					type: actions.END_CREATE_GROUP
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'success',
					msg: '添加成功！'
				})
			} else {
				dispatch({
					type: actions.ERROR_CREATE_GROUP
				})
				return response.json()
			}
		}).then(result => {
			//todo 无错误 执行第二次 成功刷新group
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: result.Message
			})
		})
	}
}