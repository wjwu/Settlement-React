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

		client.get(API_PATH, request).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_GET_GROUPS
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_GET_GROUPS,
					result: result
				})
			}
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

		client.post(API_PATH, request).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_CREATE_GROUP
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_CREATE_GROUP
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