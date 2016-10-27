import ReducerBase from './ReducerBase'
import * as actionTypes from '../constants/sheet'

const MODULE_NAME = 'SHEET'

class SheetReducer extends ReducerBase {
	constructor() {
		super(MODULE_NAME, actionTypes)
	}
}
export default SheetReducer