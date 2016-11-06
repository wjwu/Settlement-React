import ReducerBase from './ReducerBase'

class UserReducer extends ReducerBase {
	constructor() {
		super('USER')
	}
}
export default new UserReducer()