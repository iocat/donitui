import {
    red300 as red,
    greenA400 as green,
    yellowA700 as yellow,
    grey500 as grey
} from 'material-ui/styles/colors';

export let getTaskStatusColor = (status)=> {
    switch(status){
        case "DONE":
            return red;
        case "NOT_DONE":
            return yellow;
        case "IN_PROGRESS":
            return green;
        default:
            console.log("task status "+status+"not supported");
    }
}

export let getHabitStatusColor = getTaskStatusColor

export let getUserStatusColor = (status) =>{
    switch(status){
        case "OFFLINE":
            return grey;
        case "ONLINE":
            return green;
        case "BUSY":
            return yellow;
        default:
            console.log("task status "+status+"not supported");
    }
}

