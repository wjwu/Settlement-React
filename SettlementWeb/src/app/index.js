import React from 'react'
import ReactDOM from 'react-dom'
import {
	createStore,
	applyMiddleware
} from 'redux'
import {
	Provider
} from 'react-redux'
import {
	browserHistory,
	Router,
	Route
} from 'react-router'
import thunk from 'redux-thunk'
import reducer from './reducers'

import Home from './pages/home'
import Group from './pages/group'

const store = createStore(reducer, applyMiddleware(thunk))

const success = function() {
	message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10)
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/home' component={Home}/>
			<Route path='/group' component={Group}/>
		</Router>
	</Provider>,
	document.getElementById('root')
)