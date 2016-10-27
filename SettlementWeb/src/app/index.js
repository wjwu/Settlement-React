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
import Sheet from './pages/sheet'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/home' component={Home}/>
			<Route path='/group' component={Group}/>
			<Route path='/dic' component={Dictionary}/>
			<Route path='/sheet' component={Sheet}/>
		</Router>
	</Provider>,
	document.getElementById('root')
)