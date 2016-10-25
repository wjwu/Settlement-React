import ReducerBase from './ReducerBase'
import * as actionTypes from '../constants/user'

const MODULE_NAME = 'USER'

class UserReducer extends ReducerBase {
	constructor() {
		super(MODULE_NAME, actionTypes)
	}
}
export default UserReducer