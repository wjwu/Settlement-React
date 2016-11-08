import * as apiClient from '../apiClient'
import {
	SHOW_MESSAGE
} from '../constants/message'
import {
	BEGIN_QUERY_SHEETS,
	END_QUERY_SHEETS,
	ERROR_QUERY_SHEETS,
	BEGIN_CREATE_SHEET,
	END_CREATE_SHEET,
	ERROR_CREATE_SHEET,
	BEGIN_UPDATE_SHEET,
	END_UPDATE_SHEET,
	ERROR_UPDATE_SHEET
} from '../constants/sheet'

export const querySheets = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_QUERY_SHEETS
		})
		apiClient.get('sheet', request).then(result => {
			dispatch({
				type: END_QUERY_SHEETS,
				result: result
			})
		}, error => {
			dispatch({
				type: ERROR_QUERY_SHEETS
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const createSheet = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_CREATE_SHEET,
		})
		apiClient.post('sheet', request).then(result => {
			dispatch({
				type: END_CREATE_SHEET,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '添加成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_CREATE_SHEET
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}

export const updateSheet = request => {
	return dispatch => {
		dispatch({
			type: BEGIN_UPDATE_SHEET,
		})
		apiClient.put('sheet', request).then(result => {
			dispatch({
				type: END_UPDATE_SHEET,
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '修改成功！'
			})
		}, error => {
			dispatch({
				type: ERROR_UPDATE_SHEET
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}
}