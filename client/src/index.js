import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import userReducer from './reducers/userReducer';
import errorReducer from './reducers/errorReducer';
import thunk from 'redux-thunk';
import AppContainer from './containers/AppContainer';
import 'semantic-ui-css/semantic.min.css';

const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const store = createStore(combineReducers({
    router: routerReducer,
    user: userReducer,
    error: errorReducer
}), applyMiddleware(thunk, reduxRouterMiddleware));

render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
