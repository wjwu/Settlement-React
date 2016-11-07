import ActionBase from './ActionBase'

class DictionaryAction extends ActionBase {
	constructor() {
		super('dictionary', 'DICTIONARY')
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
}

export default new DictionaryAction()