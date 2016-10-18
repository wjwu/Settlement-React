import React from 'react'
import ReactDOM from 'react-dom'
import {
	browserHistory,
	Router,
	Route
} from 'react-router'
import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import {
	Provider,
	connect
} from 'react-redux'
import thunk from 'redux-thunk'

import Home from './home'
import Group from './group'

import groupReducer from './group/reducer'

const reducer = combineReducers({
	groupReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/home' component={Home}/>
			<Route path='/group' component={Group}/>
		</Router>
	</Provider>,
	document.getElementById('root')
)