import ReducerBase from './ReducerBase'
import * as actionTypes from '../constants/dictionary'

const MODULE_NAME = 'DICTIONARY'

class DictionaryReducer extends ReducerBase {
	constructor() {
		super(MODULE_NAME, actionTypes)
	}
}
export default DictionaryReducer