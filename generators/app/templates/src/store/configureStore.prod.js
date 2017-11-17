import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import history from '../app/history';

export default (rootReducer) => preloadedState => {
	const sagaMiddleware = createSagaMiddleware();
	return {
		... createStore(
			rootReducer,
			preloadedState,
			applyMiddleware(sagaMiddleware, routerMiddleware(history)),
		),
		runSaga: sagaMiddleware.run(rootSaga)
	};
};
