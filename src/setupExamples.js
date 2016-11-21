/* some test code! */
import {
    ActionCreators
} from './actions';
import {
    StatusFilter
} from './data/index';
import {
    appStore
} from './stores/appStore';

export default function setupExamples() {
    let placeholder = "https://unsplash.it/300/300/?random";
    let goal1 = {
        id: 1,
        name: "Have a dog",
        description: "Better be a Corgi",
        visibility: "PUBLIC",
        //img: placeholder,
        tasks: [{
            id: "1",
            name: "Adopt one",
            reminder: {
                remindAt: new Date((new Date().getTime() + 10000000)),
                duration: 10,
            },
        }, {
            id: "3",
            name: "sdfasdfasdf",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt:  new Date((new Date().getTime() + 98000000)),
                duration: 100,
            },
        }],

    }

    let goal2 = {
        id: 2,
        name: "Software Engineer!!",
        visibility: "PRIVATE",
        img: placeholder,
        description: "My career",
        tasks: [{
            id: "1",
            name: "Code",
            reminder: {
                remindAt: new Date((new Date().getTime() - 103920)),
                duration: 200,
            },
        }, {
            id: 3,
            name: "Read a lot",
            repeatedReminder: {
                remindAt: new Date((new Date().getTime() + 121300000)),
                duration: 100,
                cycle: "EVERY_WEEK",
                days: {
                    1: true,
                    3: true,
                }
            },
        }, {
            id: 2,
            name: "Read The Algorithms Design Manual",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt: new Date(),
                duration: 350,
                days: {
                    1: true,
                    2: true
                },
            },
        }],
    }

    let goal3 = {
        id: 3,
        name: "Get a cat",
        visibility: "FOR_FOLLOWERS",
        // img: placeholder,
        description: "LOLCAT",
        tasks: [{
            id: 1,
            name: "Go to the vet",
            reminder: {
                remindAt: new Date((new Date().getTime() - 23823000)),
                duration: 1000,
            }
        }],
    }
    let goal5 = {
        id: 5,
        name: "Be busy",
        visibility: "PRIVATE",
        img: placeholder,
        tasks: [{
            id: "2",
            name: "Be yourself",
            repeatedReminder: {
                cycle: "EVERY_WEEK",
                days: {
                    6: true
                },
                remindAt: new Date(),
                duration: 100,
            }
        }],
    }

    let goal4 = Object.assign({}, goal1, {
        id: 4,
        name: "Kill a dog",
        description: "Illegal stuffs",
        img: placeholder
    });

    let goals = [goal1,goal2,goal3,goal4,goal5];



    /* ignore return val*/
    appStore.subscribe(() => {
        console.log(appStore.getState())
    })
    appStore.dispatch(ActionCreators.LOAD_GOALS(goals, new Date()));
    appStore.dispatch(ActionCreators.FILTER_GOAL_BY_STATUSES(StatusFilter.IN_PROGESS));
}
