//@flow
import {appStore} from './stores/appStore';
import {ActionCreators} from './actions';
import { CLOCK_UPDATE_CYCLE } from './global';

// bootstrap sets up global events that automatically handles app's update
export default () => {
    // change the current time every 60 minutes
    setInterval(() => appStore.dispatch(ActionCreators.SET_CURRENT_TIME(new Date())), CLOCK_UPDATE_CYCLE);
}
