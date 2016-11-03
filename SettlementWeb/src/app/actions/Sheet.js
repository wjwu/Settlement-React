import ActionBase from './ActionBase'
import * as actionTypes from '../constants/sheet'

const API_PATH = 'sheet'
const MODULE_NAME = 'SHEET'

class SheetAction extends ActionBase {
	constructor() {
		super(API_PATH, MODULE_NAME, actionTypes)
	}
	get(id) {
		return dispatch => {
			super.get(dispatch, id)
		}
	}

	query(request) {
		return dispatch => {
			return super.query(dispatch, request)
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

export default new SheetAction()