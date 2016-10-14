import {
	BEGIN_CHECK_CAPTCHA,
	CHECK_CAPTCHA_SUCCESS,
	CHECK_CAPTCHA_FAIL
} from './constants'

const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case BEGIN_CHECK_CAPTCHA:
			return {
				...state,
				'checkStatus': action.type
			}
		case CHECK_CAPTCHA_SUCCESS:
			return {
				...state,
				'checkStatus': action.type
			}
		case CHECK_CAPTCHA_FAIL:
			return {
				...state,
				'checkStatus': action.type
			}
		default:
			return state
	}
}

export default loginReducer