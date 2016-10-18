import {
	GROUP_INIT,
	GROUP_END_INIT
} from './constants'

const groupReducer = (state = {}, action) => {
	switch (action.type) {
		case GROUP_INIT:
			return {
				...state,
			}
		case GROUP_END_INIT:
			return {
				...state,
				loading: false,
				data: action.data
			}
		default:
			return {
				...state,
				loading: true,
			}
	}
}

export default groupReducer