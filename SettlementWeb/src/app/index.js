import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import routers from './routers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routers}/>
	</Provider>,
	document.getElementById('root')
);