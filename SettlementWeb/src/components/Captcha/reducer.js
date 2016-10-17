import {
	REFRESH
} from './action'

const createTimeSpan = () => {
	let strRand = Math.random() + ''
	return strRand.substr(2, strRand.length - 2)
}

const captchaReducer = (state, action) => {
	switch (action.type) {
		case REFRESH:
			return {
				...state,
				timeSpan: createTimeSpan()
			}
		default:
			return {
				...state,
				timeSpan: createTimeSpan()
			}
	}
}

export default captchaReducer