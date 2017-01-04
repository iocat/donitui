// @flow
import {
    red300 as red,
    greenA400 as green,
    yellowA700 as yellow,
    grey500 as grey
} from 'material-ui/styles/colors';

import { Status, UserStatus} from '../../data/index';
import type { StatusEnum } from '../../data/types';

export let getStatusColor = (status: StatusEnum)=> {
    switch(status){
        case Status.DONE:
            return red;
        case Status.INACTIVE:
            return yellow;
        case Status.ACTIVE:
            return green;
        default:
            console.log("task status "+status+"not supported");
    }
}

export let getUserStatusColor = (status: any) =>{
    switch(status){
        case UserStatus.OFFLINE:
            return grey;
        case UserStatus.ONLINE:
            return green;
        case UserStatus.BUSY:
            return yellow;
        default:
            console.log("task status "+status+"not supported");
    }
}
