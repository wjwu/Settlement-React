import ActionBase from './ActionBase'
const md5 = require('md5')

class UserAction extends ActionBase {
	constructor() {
		super('user', 'USER')
	}

	query(request) {
		return dispatch => {
			super.query(dispatch, request)
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