import {
	SHOW_MESSAGE
} from '../constants/message'

const message = (state = {}, action) => {
	if (state.hasOwnProperty('type')) {
		delete state.type
		delete state.msg
	}
	switch (action.type) {
		case SHOW_MESSAGE:
			return Object.assign({}, state, {
				type: action.msgType,
				msg: action.msg
			})
		default:
			return state
	}
}

export default message