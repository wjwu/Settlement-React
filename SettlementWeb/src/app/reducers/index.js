import {
	combineReducers
} from 'redux'

import message from './message'
import GroupReducer from './Group'
import UserReducer from './User'
import DictionaryReducer from './Dictionary'
import SheetReducer from './Sheet'

const group = new GroupReducer()
const user = new UserReducer()
const dictionary = new DictionaryReducer()
const sheet = new SheetReducer()

export default combineReducers({
	message,
	'group': group.reduce.bind(group),
	'user': user.reduce.bind(user),
	'dictionary': dictionary.reduce.bind(dictionary),
	'sheet': sheet.reduce.bind(sheet)
})