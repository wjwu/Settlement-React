import {
	combineReducers
} from 'redux'

import group from './group'
import user from './user'
import message from './message'

export default combineReducers({
	group,
	user,
	message
})