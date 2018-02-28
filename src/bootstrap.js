//@flow
import {appStore} from './stores/appStore';

import { CLOCK_UPDATE_CYCLE } from './global';
import * as thunks from './reducers/thunks';
import {ActionCreators} from'./actions';

import setupExamples from './setupExamples';

// bootstrap sets up global events that automatically handles app's update
export default () => {
    // change the current time every clock update cycle
    appStore.dispatch(thunks.globalClockTick(CLOCK_UPDATE_CYCLE));
    appStore.dispatch(ActionCreators.LOAD_GOALS(setupExamples()))
    appStore.dispatch(ActionCreators.GOOGLE_USER_SIGN_IN({},"123"))
}
