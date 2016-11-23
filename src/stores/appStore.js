// @flow
import {createStore} from 'redux';
import {root} from  '../reducers/root';

// global app store that receives every actions
export var appStore = createStore(root);
