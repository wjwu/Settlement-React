import {
	expired
} from './auth'

const enter = (nextState, replace, callback) => {
	// const user = JSON.parse(sessionStorage.getItem('user'))
	// if (user.Role === 'Employee') {
	// 	replace('/home')
	// }
	// console.log(nextState.location.pathname)
	expired().then(result => {
		callback()
	}, error => {
		if (window.top == window.self) {
			window.location.href = '/'
		} else {
			window.top.location.href = '/'
		}
	})
}

const routes = [{
	path: '/home',
	onEnter: enter,
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/home'))
		}, 'home')
	}
}, {
	path: '/group',
	onEnter: enter,
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/group'))
		}, 'group')
	}
}, {
	path: '/dic',
	onEnter: enter,
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/dictionary'))
		}, 'dictionary')
	}
}, {
	path: '/sheet',
	onEnter: enter,
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/sheet'))
		}, 'sheet')
	}
}, {
	path: '/stats',
	onEnter: enter,
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./pages/stats'))
		}, 'stats')
	}
}]

export default routes