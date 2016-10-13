export default reducer = (state, action) => {
	switch (action.type) {
		case 'RefreshCaptcha':
			return {
				...state,
				captchaId: action.captchaId
			}
		default:
			return state
	}
}