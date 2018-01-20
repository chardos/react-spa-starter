import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from './ducks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
