import 'babel-polyfill'
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
	Router
} from 'react-router'
import thunk from 'redux-thunk'
import reducer from './reducers'
import routes from './routes'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>,
	document.getElementById('root')
)