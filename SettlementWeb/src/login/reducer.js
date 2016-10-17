import {
	BEGIN_CHECK_CAPTCHA,
	CHECK_CAPTCHA_SUCCESS,
	CHECK_CAPTCHA_FAIL
} from './constants'

const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case BEGIN_CHECK_CAPTCHA:
			return {
				...state
			}
		case CHECK_CAPTCHA_SUCCESS:
			return {
				...state
			}
		case CHECK_CAPTCHA_FAIL:
			return {
				...state
			}
		default:
			return state
	}
}

export default loginReducer