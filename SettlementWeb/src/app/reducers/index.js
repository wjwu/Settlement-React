import {
	combineReducers
} from 'redux'

import group from './group'
import user from './user'
import message from './message'
import dictionary from './dictionary'

export default combineReducers({
	group,
	user,
	message,
	dictionary
})