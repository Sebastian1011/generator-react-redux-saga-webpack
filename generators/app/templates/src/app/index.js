import React from 'react';
import { render } from 'react-dom';
import Root from './root';
import configureStore from '../store/configureStore';
import rootReducer from '../reducers';
const relativePath = "../reducers/index.js";
import history from './history';
const store = configureStore(rootReducer, relativePath)();


const mountNode = document.getElementById('App');
const RootComponent = (<Root store={store} history={history}/>);
const renderApp = () => {
    render(RootComponent, mountNode);
};
renderApp();

if (module.hot) {
    module.hot.accept('./root', () => {
        renderApp();
    });
}

