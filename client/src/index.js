import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { createStore, combineReducers } from 'redux'
import configureStore from './store/store';
import { Provider } from 'react-redux'


ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>, document.getElementById('root')
);

serviceWorker.unregister();