import {createStore} from 'redux';
import {Root} from  '../reducers/Root';

// global app store that receives every actions
export var appStore = createStore(Root);