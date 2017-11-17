import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import history from "../app/history";

export default (rootReducer, relativePath) => preloadedState => {
	const sagaMiddleware = createSagaMiddleware();
	const composeEnhancers =
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

	const store = createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(sagaMiddleware, routerMiddleware(history), createLogger())
		)
	);
	sagaMiddleware.run(rootSaga);
	if(module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
