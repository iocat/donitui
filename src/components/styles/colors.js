import {
    red300 as red,
    greenA400 as green,
    yellowA700 as yellow,
    grey500 as grey
} from 'material-ui/styles/colors';

import {GoalStatus, UserStatus} from '../../data/index';


export let getStatusColor = (status)=> {
    switch(status){
        case GoalStatus.DONE:
            return red;
        case GoalStatus.NOT_DONE:
            return yellow;
        case GoalStatus.IN_PROGRESS:
            return green;
        default:
            console.log("task status "+status+"not supported");
    }
}

export let getUserStatusColor = (status) =>{
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
