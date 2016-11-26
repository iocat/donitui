/* some test code! */
import {
    ActionCreators
} from './actions';
import {
    appStore
} from './stores/appStore';

export default function setupExamples() {
    let placeholder = "https://unsplash.it/200/300/?blur";
    let goal1 = {
        id: 1,
        name: "Have a dog",
        description: "Better be a Corgi",
        visibility: "PUBLIC",
        //img: placeholder,
        tasks: [{
            name: "Adopt one",
            reminder: {
                remindAt: new Date((new Date().getTime() + 10*60000)),
                duration: 5,
            },
        }, {
            name: "sdfasdfasdf",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt:  new Date((new Date().getTime() + 10*60000)),
                duration: 5,
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
            name: "Code",
            reminder: {
                remindAt: new Date((new Date().getTime())),
                duration: 2,
            },
        }, {
            name: "Read a lot",
            repeatedReminder: {
                remindAt: new Date((new Date().getTime() + 100000000)),
                duration: 10,
                cycle: "EVERY_WEEK",
                days: {
                    1: true,
                    3: true,
                }
            },
        }, {
            name: "Read The Algorithms Design Manual",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt: new Date(),
                duration: 20,
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
            name: "Go to the vet",
            reminder: {
                remindAt: new Date((new Date().getTime() - 23823000)),
                duration: 20,
            }
        }],
    }
    let goal5 = {
        id: 5,
        name: "Be busy",
        visibility: "PRIVATE",
        img: placeholder,
        tasks: [{
            name: "Be yourself",
            status:"DONE",
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

    let goals = [goal1,goal2,goal3,goal5];

    /* ignore return val*/
    appStore.subscribe(() => {
        console.log(appStore.getState())
    })
    appStore.dispatch(ActionCreators.LOAD_GOALS(goals, new Date()));
    appStore.dispatch(ActionCreators.PREPROCESS_SCHEDULER(new Date()));
}
