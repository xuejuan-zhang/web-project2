import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App'
import './index.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer.js';

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,    
    document.getElementById('root')
)