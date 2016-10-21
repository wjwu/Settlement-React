import {
	SHOW_MESSAGE
} from '../constants/message'

const message = (state, action) => {
	switch (action.type) {
		case SHOW_MESSAGE:
			return Object.assign({}, state, {
				msgType: action.msgType,
				msg: action.msg
			})
		default:
			return {
				msgType: null
			}
	}
}

export default message