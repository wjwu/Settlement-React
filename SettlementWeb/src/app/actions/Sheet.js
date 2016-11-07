import ActionBase from './ActionBase'

class SheetAction extends ActionBase {
	constructor() {
		super('sheet', 'SHEET')
	}
	get(id) {
		return dispatch => {
			super.get(dispatch, id)
		}
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

export default new SheetAction()