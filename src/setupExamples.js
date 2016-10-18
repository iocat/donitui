/* some test code! */
import { ActionCreators } from './actions/index';
import {StatusFilter} from './data/index';
import { appStore } from './stores/appStore';
export default function setupExamples() {
    let placeholder = "https://isardasorensen.files.wordpress.com/2016/01/tp-beautiful-sunset-twilight-nyc-1-27-16.jpg";
    let goal1 = {
        id: 1,
        name: "Have a dog",
        description: "Better be a Corgi",
        visibility: "PUBLIC",
        //img: placeholder,
        tasks: {
            "1": {
                id: "1",
                name: "Adopt one",
                reminder: {},
                status: "DONE",
            },
            "3": {
                id: "3",
                name: "sdfasdfasdf",
                repeatedReminder: {},
                description: "ADSSAD",
                status: "DONE",
            }
        }
    }

    let goal2 = {
        id: 2,
        name: "Software Engineer!!",
        visibility: "PRIVATE",
        img: placeholder,
        description: "My career",
        tasks: {
            "1": {
                id: "1",
                name: "Do whatever I want to do",
                status: "DONE",
                reminder: {},
            },
            "3": {
                id: "3",
                name: "Read a lot",
                status: "DONE",
                repeatedReminder: {},
            },
            "2": {
                id: "2",
                name: "On the internet, nobody knows you are a dog",
                status: "DONE",
                repeatedReminder: {},
            }
        }
    }

    let goal3 = {
        id: "3",
        name: "Get a cat",
        visibility: "FOR_FOLLOWERS",
        img: placeholder,
        description: "LOLCAT",
        tasks: {
            "1":{
                id: 1,
                name:"Cat is awesome",
                status:"IN_PROGRESS",
                reminder:{}
            }
        },
    }
    let goal5 = {
        id: "5",
        name:"Get a girl friend",
        visibility: "PRIVATE",
        img: placeholder,
        tasks:{
            "2":{
                id:"2",
                name:"Be yourself",
                status:"IN_PROGRESS",
                repeatedReminder:{}
            }
        }
    }

    let goal4 = Object.assign({}, goal1, { id: "4", name: "Kill a dog", description: "Illegal stuffs", img: placeholder });
    /* ignore return val*/ appStore.subscribe(() => { console.log(appStore.getState()) })
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID("1", goal1));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID("2", goal2));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID("3", goal3));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID("4", goal4));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID("5", goal5));
    for (let i = 7 ; i < 10; i ++ ){
        appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(i, Object.assign({}, goal1,{id:(i+""), name: i, img:placeholder})));
    }
    appStore.dispatch(ActionCreators.FILTER_GOAL_BY_STATUSES(StatusFilter.IN_PROGESS));
}
