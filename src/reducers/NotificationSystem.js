// @flow

import type {$NotificationSystem} from '../data/reducers';

export function NotificationSystem(state: $NotificationSystem, action: any): $NotificationSystem{
    if (state === undefined){
        return {
            
        };
    }
    switch(action.type){
    default:
        return state;
    }
}
