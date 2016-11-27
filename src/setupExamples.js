// @flow
import type {
    Goal
} from './data/types';

export default (): Goal[] => {
    let goal1 = {
        id: 1,
        status: "NOT_DONE",
        name: "Have a dog",
        description: "Better be a Corgi",
        visibility: "PUBLIC",
        img: "https://unsplash.it/200/201",
        tasks: [{
            name: "Adopt one",
            reminder: {
                remindAt: new Date((new Date().getTime() + 3000)),
                duration: 2,
            },
        }, {
            name: "Feed it",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt:  new Date((new Date().getTime() + 30000)),
                duration: 1,
            },
        }],

    }

    let goal2 = {
        id: 2,
        status: "NOT_DONE",
        name: "Software Engineer!!",
        visibility: "PRIVATE",
        img: "https://unsplash.it/200/202",
        description: "My career",
        tasks: [{
            name: "Code",
            reminder: {
                remindAt: new Date((new Date().getTime())-2*60000),
                duration: 3,
            },
        }, {
            name: "Read a lot",
            repeatedReminder: {
                remindAt: new Date((new Date().getTime() + 100000000)),
                duration: 10,
                cycle: "EVERY_WEEK",
                days: {
                    0: true,
                    1: true,
                    3: true,
                }
            },
        }, {
            name: "Read The Algorithms Design Manual",
            repeatedReminder: {
                cycle: "EVERY_DAY",
                remindAt: new Date(new Date().getTime() + 2*1000),
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
        status: "NOT_DONE",
        visibility: "FOR_FOLLOWERS",
        img: "https://unsplash.it/200/203",
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
        status: "NOT_DONE",
        img: "https://unsplash.it/200/204",
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

    return [goal1,goal2,goal3,goal5];
}
