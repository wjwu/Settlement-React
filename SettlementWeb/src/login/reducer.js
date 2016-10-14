export default reducer = (state, action) => {
	switch (action.type) {
		case 'SAY_SOMETHING':
			return {
				...state,
				message: action.value
			}
		case 'DO_SOMETHING':
			// ...
		case 'LEARN_SOMETHING':
			// ...
		case 'HEAR_SOMETHING':
			// ...
		case 'GO_SOMEWHERE':
			// ...
			// etc.
		default:
			return state
	}
}