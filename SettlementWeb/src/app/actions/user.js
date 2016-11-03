import ActionBase from './ActionBase'
import * as actionTypes from '../constants/user'
const md5 = require('md5')

const API_PATH = 'user'
const MODULE_NAME = 'USER'

class UserAction extends ActionBase {
	constructor() {
		super(API_PATH, MODULE_NAME, actionTypes)
	}

	query(request) {
		return dispatch => {
			return super.query(dispatch, request)
		}
	}

	create(request) {
		return dispatch => {
			request.password = md5(request.password)
			super.create(dispatch, request)
		}
	}

	update(request) {
		return dispatch => {
			super.update(dispatch, request)
		}
	}
}

export default new UserAction()