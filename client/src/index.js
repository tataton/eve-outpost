import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers';
import middleware from './middleware';
import AppContainer from './containers/AppContainer';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(rootReducer, middleware);

render((
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
