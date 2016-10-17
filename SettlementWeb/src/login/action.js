import {
	post
} from './serviceWrapper'
import {
	API_URL
} from './constants'
const md5 = require('md5')

const checkCaptcha = (captcha, timeSpan) => {
	return dispatch => {
		return post(`${API_URL}captcha/check`, {
			captcha: captcha,
			timeSpan: timeSpan
		})
	}
}

const login = (loginID, password, captcha, timeSpan) => {
	return dispatch => {
		return post(`${API_URL}sign/in`, {
			loginID: loginID,
			password: md5(password),
			captcha: captcha,
			timeSpan: timeSpan
		})
	}
}


export {
	checkCaptcha,
	login
}