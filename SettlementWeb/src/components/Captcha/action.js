const refreshCaptcha = (captchaId) => {
	return {
		type: 'RefreshCaptcha',
		captchaId: captchaId
	}
}

export default refreshCaptcha