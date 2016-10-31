import ActionBase from './ActionBase'
import * as actionTypes from '../constants/dictionary'

const API_PATH = 'dictionary'
const MODULE_NAME = 'DICTIONARY'

class DictionaryAction extends ActionBase {
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
}

export default new DictionaryAction()