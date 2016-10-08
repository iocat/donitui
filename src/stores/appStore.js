import {createStore} from 'redux';
import { root as rootReducer } from  '../reducers/root';

// global app store that receives every actions
export var appStore = createStore(rootReducer);