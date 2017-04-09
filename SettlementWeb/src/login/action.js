import { post } from './apiClient';
const md5 = require('md5');

export default (loginID, password, captcha, timeSpan) => {
	return post('sign/in', {
		loginID: loginID,
		password: md5(password),
		captcha: captcha,
		timeSpan: timeSpan
	});
};