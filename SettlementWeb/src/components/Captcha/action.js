const refreshCaptcha = (captchaId) => {
	return dispatch => {
		dispatch({
			type: 'RefreshCaptcha',
			captchaId: captchaId
		})
	}
}

export default refreshCaptcha