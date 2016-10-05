import {createStore} from 'redux';
import { root as rootReducer } from  '../reducers/root';

// global app store that receives every actions
export default appStore = createStore(rootReducer);

