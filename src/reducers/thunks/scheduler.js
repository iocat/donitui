//@flow
import {ActionCreators} from '../../actions';

// tickCycle is the number of seconds, this only needs to be set ONCE
export function globalClockTick(tickCycle: number){
    return (dispatcher: any)=> {
        setInterval(
            ()=>dispatcher(ActionCreators.SET_CURRENT_TIME(new Date().getTime())),tickCycle
        )
    }
}
