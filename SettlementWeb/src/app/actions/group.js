import ActionBase from './ActionBase'
import * as actionTypes from '../constants/group'

const API_PATH = 'group'
const MODULE_NAME = 'GROUP'

class GroupAction extends ActionBase {
	constructor() {
		super(API_PATH, MODULE_NAME, actionTypes)
	}

	query(request) {
		return dispatch => {
			super.query(dispatch, request)
		}
	}

	create(request) {
		return dispatch => {
			super.create(dispatch, request)
		}
	}

	update(request) {
		return dispatch => {
			super.update(dispatch, request)
		}
	}

	del(id) {
		return dispatch => {
			return super.del(id)
		}
	}
}

export default new GroupAction()