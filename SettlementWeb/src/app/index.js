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
import Dictionary from './pages/dictionary'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/home' component={Home}/>
			<Route path='/group' component={Group}/>
			<Route path='/dic' component={Dictionary}/>
		</Router>
	</Provider>,
	document.getElementById('root')
)