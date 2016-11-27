// @flow
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {root} from  '../reducers/root';

// global app store that receives every actions
export var appStore = createStore(root, applyMiddleware(thunk));
