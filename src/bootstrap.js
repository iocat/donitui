//@flow
import {appStore} from './stores/appStore';

import { CLOCK_UPDATE_CYCLE } from './global';
import {globalClockTick} from './reducers/thunks/scheduler';

// bootstrap sets up global events that automatically handles app's update
export default () => {
    // change the current time every clock update cycle
    appStore.dispatch(globalClockTick(CLOCK_UPDATE_CYCLE));
}
