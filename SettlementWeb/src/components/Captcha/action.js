export const REFRESH = 'REFRESH'

const refresh = () => {
	return dispatch => {
		dispatch({
			type: REFRESH
		})
	}
}

export default refresh