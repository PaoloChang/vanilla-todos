/** 
 * This is new indexjs with React-Redux
 * To test Vanilla Todos, rename vanilla_index.js to index.js and
 * switch the comments in public/index.html
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App'
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);