import * as client from '../apiClient'
import * as actions from '../constants/dictionary'
import {
	SHOW_MESSAGE
} from '../constants/message'

const API_PATH = 'dictionary'

const query = (type, pageIndex = 1) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_GET_DICTIONARIES
		})

		let request = {
			pageIndex,
			type
		}

		client.get(API_PATH, request).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_GET_DICTIONARIES
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_GET_DICTIONARIES,
					result: result
				})
			}
		})
	}
}

const create = (dictionary) => {
	return dispatch => {
		dispatch({
			type: actions.BEGIN_CREATE_DICTIONARY,
		})
		client.post(API_PATH, dictionary).then(result => {
			if (result.Message) {
				dispatch({
					type: actions.ERROR_CREATE_DICTIONARY
				})
				dispatch({
					type: SHOW_MESSAGE,
					msgType: 'error',
					msg: result.Message
				})
			} else {
				dispatch({
					type: actions.END_CREATE_DICTIONARY
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

export {
	query,
	create
}