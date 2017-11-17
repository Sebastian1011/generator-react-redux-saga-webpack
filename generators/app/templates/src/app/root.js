import React from 'react';
import {Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import {Provider} from 'react-redux';
import TestPage from './pages/test/test';
import TestPage1 from './pages/test/test1';

const Root = ({store, history}) => (
	<Provider store={store}>
        <ConnectedRouter history={history}>
            <HashRouter>
                <div>
                    <Route exact path="/" component={TestPage}/>
                    <Switch>
                        <Route path="/about" component={TestPage1}/>
                        <Route path="/about/hehe" component={TestPage1}/>
                    </Switch>
                    <Route path="/topics" component={TestPage}/>
                </div>
            </HashRouter>
        </ConnectedRouter>
    </Provider>
);

export default Root;
