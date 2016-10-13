export refreshCaptcha = (captchaId) => {
	return dispatch => {
		dispatch({
			type: 'RefreshCaptcha'
			captchaId: captchaId
		})
	}
}