import ActionBase from './ActionBase'

class GroupAction extends ActionBase {
	constructor() {
		super('group', 'GROUP')
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