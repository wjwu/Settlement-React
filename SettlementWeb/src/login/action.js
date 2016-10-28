import {
	post
} from './apiClient'

const md5 = require('md5')

const checkCaptcha = (captcha, timeSpan) => {
	return post('captcha/check', {
		captcha: captcha,
		timeSpan: timeSpan
	})
}

const login = (loginID, password, captcha, timeSpan) => {
	return post('sign/in', {
		loginID: loginID,
		password: md5(password),
		captcha: captcha,
		timeSpan: timeSpan
	})
}


export {
	checkCaptcha,
	login
}