import {
	SHOW_MESSAGE
} from '../constants/message'

const message = (state = {
	msgType: null
}, action) => {
	switch (action.type) {
		case SHOW_MESSAGE:
			return Object.assign({}, state, {
				msgType: action.msgType,
				msg: action.msg
			})
		default:
			return state
	}
}

export default message