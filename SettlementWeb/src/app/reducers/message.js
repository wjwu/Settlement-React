import { SHOW_GLOBAL_MESSAGE } from '../actions/message';

const message = (state = {}, action) => {
	if (state.hasOwnProperty('type')) {
		delete state.type;
		delete state.msg;
	}
	switch (action.type) {
		case SHOW_GLOBAL_MESSAGE:
			return {
				...state,
				type: action.msgType,
				msg: action.msg
			};
		default:
			return state;
	}
};

export default message;