import {
	REFRESH_CAPTCHA
} from './action'

const captchaReducer = (state = {}, action) => {
	switch (action.type) {
		case REFRESH_CAPTCHA:
			return {
				...state,
				timeSpan: action.timeSpan
			}
		default:
			return state
	}
}

export default captchaReducer