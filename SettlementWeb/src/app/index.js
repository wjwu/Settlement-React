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
import auth from './auth'

import Home from './pages/home'
import Group from './pages/group'
import Dictionary from './pages/dictionary'
import Sheet from './pages/sheet'
import Stats from './pages/stats'

const store = createStore(reducer, applyMiddleware(thunk))

const enter = (nextState, replace, callback) => {
	auth().then(result => {
		callback()
	}, error => {
		if (window.top == window.self) {
			window.location.href = '/'
		} else {
			window.top.location.href = '/'
		}
	})
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/home' component={Home} onEnter={enter}/>
			<Route path='/group' component={Group} onEnter={enter}/>
			<Route path='/dic' component={Dictionary} onEnter={enter}/>
			<Route path='/sheet' component={Sheet} onEnter={enter}/>
			<Route path='/stats' component={Stats} onEnter={enter}/>
		</Router>
	</Provider>,
	document.getElementById('root')
)