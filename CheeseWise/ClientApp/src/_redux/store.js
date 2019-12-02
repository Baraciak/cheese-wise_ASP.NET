import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from "./user/duck";

const store = createStore(userReducer, composeWithDevTools());
window.store = store;

export default store;
