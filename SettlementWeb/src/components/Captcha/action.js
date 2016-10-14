export const REFRESH_CAPTCHA = 'REFRESH_CAPTCHA'

export const refreshCaptcha = (timeSpan) => {
	return dispatch => {
		dispatch({
			type: REFRESH_CAPTCHA,
			timeSpan: timeSpan
		})
	}
}