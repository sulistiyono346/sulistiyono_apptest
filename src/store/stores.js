import {applyMiddleware, createStore} from 'redux';
import reducer from '../store/reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
