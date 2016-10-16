/* some test code! */
import { ActionCreators } from './actions/index';
import { appStore } from './stores/appStore';
export default function setupExamples() {
    let goal1 = {
        id: 1,
        name: "Have a dog",
        description: "Better be a Corgi",
        visibility: "PUBLIC",
        img: "https://static.pexels.com/photos/177623/pexels-photo-177623.jpeg",
        tasks: {
            1: {
                id: 1,
                name: "Adopt one",
                reminder: {

                },
                status: "DONE",
            },
            3: {
                id: 3,
                name: "sdfasdfasdf",
                repeatedReminder: {

                },
                description: "ADSSAD",
                status: "DONE",
            }
        }
    }

    let goal2 = {
        id: 2,
        name: "Software Engineer!!",
        visibility: "PRIVATE",
        img: "https://static.pexels.com/photos/24980/pexels-photo-24980.jpg",
        description: "My career",
        tasks: {
            1: {
                id: 1,
                name: "Completely accept",
                status: "DONE",
                reminder: {

                },
            },
            3: {
                id: 3,
                name: "Read a lot",
                status: "DONE",
                repeatedReminder: {

                },
            },
            2: {
                id: 2,
                name: "On the internet, nobody knows you are a dog",
                status: "DONE",
                repeatedReminder: {

                },
            }
        }
    }

    let goal3 = {
        id: 3,
        name: "Get a cat",
        visibility: "FOR_FOLLOWERS",
        img: "https://static.pexels.com/photos/195131/pexels-photo-195131.jpeg",
        description: "LOLCAT",
        tasks: {
            1:{
                id: 1,
                name:"Cat is awesome",
                status:"IN_PROGRESS",
                reminder:{

                }
            }
        },
    }
    let goal5 = {
        id: 5,
        name:"Get a girl friend",
        visibility: "PRIVATE",
        img: "https://static.pexels.com/photos/165867/pexels-photo-165867.jpeg",
        tasks:{
            2:{
                id:2,
                name:"Be yourself",
                status:"IN_PROGRESS",
                repeatedReminder:{

                }
            }
        }
    }

    let goal4 = Object.assign({}, goal1, { id: 4, name: "Kill a dog", description: "Illegal stuffs", img: "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/Common-dog-behaviors-explained.jpg?itok=FSzwbBoi" });
    /* ignore return val*/ appStore.subscribe(() => { console.log(appStore.getState()) })
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(1, goal1));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(2, goal2));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(3, goal3));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(4, goal4));
    appStore.dispatch(ActionCreators.CREATE_GOAL_WITH_ID(5, goal5));
    appStore.dispatch(ActionCreators.FILTER_GOAL_BY_STATUSES({"IN_PROGRESS":true}));
}
