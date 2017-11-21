import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.css'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
