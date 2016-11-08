import {
	combineReducers
} from 'redux'

import message from './message'
// import group from './Group'
// import user from './User'
// import dictionary from './Dictionary'
// import sheet from './Sheet'

// export default combineReducers({
// 	message,
// 	'group': group.reduce.bind(group),
// 	'user': user.reduce.bind(user),
// 	'dictionary': dictionary.reduce.bind(dictionary),
// 	'sheet': sheet.reduce.bind(sheet)
// })

import dictionary from '../pages/dictionary/reducer'
import group from '../pages/group/reducer'

export default combineReducers({
	message,
	dictionary,
	group
})