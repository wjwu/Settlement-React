import {
	post
} from '../serviceWrapper'
import {
	API_URL,
	BEGIN_CHECK_CAPTCHA,
	CHECK_CAPTCHA_SUCCESS,
	CHECK_CAPTCHA_FAIL
} from '../constants'

const captchActionCreator = {
	check: (captcha, timeSpan) => {
		return dispatch => {
			dispatch({
				type: BEGIN_CHECK_CAPTCHA
			})
			post(`${API_URL}captcha/check`, {
				captcha: captcha,
				timeSpan: timeSpan
			}).then(response => {
				if (response.ok) {
					dispatch({
						type: CHECK_CAPTCHA_SUCCESS
					})
				} else {
					dispatch({
						type: CHECK_CAPTCHA_FAIL
					})
				}
			})
		}
	}
}

export default captchActionCreator