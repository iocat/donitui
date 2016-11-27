//@flow
import {appStore} from './stores/appStore';
import {ActionCreators} from './actions';
import { CLOCK_UPDATE_CYCLE } from './global';

// bootstrap sets up global events that automatically handles app's update
export default () => {
    // change the current time every minute
    setInterval(() => appStore.dispatch(ActionCreators.SET_CURRENT_TIME(new Date().getTime())), CLOCK_UPDATE_CYCLE);
}
