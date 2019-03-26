import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// import { appMiddleware } from './middleware';
import { appReducers } from './reducer';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const router = routerMiddleware(history);

// tslint:disable-next-line:no-string-literal
const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export const store = createStore(
  combineReducers(appReducers),
  {},
  composeEnhancers(
    applyMiddleware(thunk, router),
    // applyMiddleware(...appMiddleware)
  )
);