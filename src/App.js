import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GoalCard from './components/goal/GoalCard'
import UserAvatarWithStatus from './components/user/UserAvatarWithStatus'

let goal = {
    name: "Have a dog",
    description: "Better be a Corgi",
    img: "http://cdn.images.express.co.uk/img/dynamic/106/590x/secondary/Corgi-on-the-beach-251307.jpg",
    tasks: [
        {
            id: 1,
            status: "NOT_DONE",
            name: "Adopt one ",
            description: "NYC's The Doggies have the best dogs"
        },
        {
            id: 2,
            status: "DONE",
            name: "Consult the laws"
        }],
    habits: [{
        id: 1,
        status: "IN_PROGRESS",
        name: "Buy dog food",
        description: "Nearby store has a really good kind for Corgi"
    }, {
            id: 3,
            status: "NOT_DONE",
            name: "Walk it"
        }]
}


let goal2 = {
    name: "Software Engineer!!",
    description: "My career",
    tasks: [],
    habits: [{
        id: 0,
        status: "NOT_DONE",
        name: "Read The Algorithm Design Manual",
        description: "Learn Algorithms Like a boss"
    },{
        id: 1,
        status: "IN_PROGRESS",
        name: "Read The Practice of Programming"
    }]
}


let goal3 = {
    name: "Adopt a cat!!",
    img: "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg",
    description: "LOLCAT",
    tasks: [
        {
            id: 0,
            status: "NOT_DONE",
            name: "Finish homework 1",
            description: "If I don't do it, I'm fucked"
        }
    ],
    habits: [{
        id: 1,
        status: "IN_PROGRESS",
        name: "Read a book",
        description: "Become wiser everyday "
    }, {
            id: 3,
            status: "NOT_DONE",
            name: "Run",
            description: "till I broke my legs"
        }]
}

const App = () => (
    <div>
        <div style={{ display: "inline-block" }}>
            <MuiThemeProvider >
                <GoalCard  goal={goal} />
            </MuiThemeProvider>
        </div>
        <div style={{ marginLeft: 20, display: "inline-block" }}>
            <MuiThemeProvider >
                <GoalCard canUpdate={true} goal={goal2} />
            </MuiThemeProvider>
        </div>
        <br/>
        <br/>
        <div style={{ marginLeft: 20 }}>
            <MuiThemeProvider >
                <GoalCard canUpdate={true} goal={goal3} />
            </MuiThemeProvider>
        </div>
        <MuiThemeProvider>
            <UserAvatarWithStatus  avatar="https://s3.amazonaws.com/uifaces/faces/twitter/marcogomes/128.jpg"/>
        </MuiThemeProvider>
    </div>
)

export default App;
