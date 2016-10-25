import ReducerBase from './ReducerBase'
import * as actionTypes from '../constants/group'

const MODULE_NAME = 'GROUP'

class GroupReducer extends ReducerBase {
	constructor() {
		super(MODULE_NAME, actionTypes)
	}
}
export default GroupReducer