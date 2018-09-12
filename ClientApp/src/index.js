import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
export const store = configureStore(initialState);

const rootElement = document.getElementById('root');

if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('debug', 'wait-time:*');
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  rootElement);

registerServiceWorker();
