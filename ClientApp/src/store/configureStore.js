import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import WaitTime from './WaitTime';
import Resort from './Resort';

export default function configureStore(initialState) {
    const middleware = [
        thunk,
    ];

    const rootReducer = combineReducers({
        resorts: Resort,
        waitTimes: WaitTime
    });

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
