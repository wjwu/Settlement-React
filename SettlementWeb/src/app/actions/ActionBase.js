import * as apiClient from '../apiClient'
import {
	SHOW_MESSAGE
} from '../constants/message'
import {
	random
} from '../common'

class ActionBase {
	constructor(apiPath, moduleName, actionTypes) {
		this.apiPath = apiPath
		this.moduleName = moduleName
		this.actionTypes = actionTypes
	}

	get(dispatch, id) {
		dispatch({
			type: this.actionTypes[`BEGIN_GET_${this.moduleName}`]
		})
		apiClient.get(`${this.apiPath}/${id}`).then(result => {
			dispatch({
				type: this.actionTypes[`END_GET_${this.moduleName}`],
				result: result
			})
		}, error => {
			dispatch({
				type: this.actionTypes[`ERROR_GET_${this.moduleName}`]
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}

	query(dispatch, request) {
		let randomStr = random()
		dispatch({
			type: this.actionTypes[`BEGIN_QUERY_${this.moduleName}`]
		})
		apiClient.get(this.apiPath, request).then(result => {
			dispatch({
				type: this.actionTypes[`END_QUERY_${this.moduleName}`],
				version: randomStr,
				result: result
			})
		}, error => {
			dispatch({
				type: this.actionTypes[`ERROR_QUERY_${this.moduleName}`]
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
		return randomStr
	}

	create(dispatch, request) {
		dispatch({
			type: this.actionTypes[`BEGIN_CREATE_${this.moduleName}`],
		})
		apiClient.post(this.apiPath, request).then(result => {
			dispatch({
				type: this.actionTypes[`END_CREATE_${this.moduleName}`],
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '添加成功！'
			})
		}, error => {
			dispatch({
				type: this.actionTypes[`ERROR_CREATE_${this.moduleName}`]
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}

	update(dispatch, request) {
		dispatch({
			type: this.actionTypes[`BEGIN_UPDATE_${this.moduleName}`],
		})
		apiClient.put(this.apiPath, request).then(result => {
			dispatch({
				type: this.actionTypes[`END_UPDATE_${this.moduleName}`],
				result: result
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'success',
				msg: '修改成功！'
			})
		}, error => {
			dispatch({
				type: this.actionTypes[`ERROR_UPDATE_${this.moduleName}`]
			})
			dispatch({
				type: SHOW_MESSAGE,
				msgType: 'error',
				msg: error
			})
		})
	}

	del(id) {
		return apiClient.del(`${this.apiPath}/${id}`)
	}
}

export default ActionBase