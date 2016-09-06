/*import React, { Component } from 'react';
 import logo from './logo.svg';
 import './App.css';


 class App extends Component {
 render() {
 return (
 <div className="App">
 <div className="App-header">
 <img src={logo} className="App-logo" alt="logo" />
 <h2>Wow this is also as fuck</h2>
 </div>
 <p className="App-intro">
 To get started, edit <code>src/App.js</code> and save to reload.
 </p>
 </div>
 );
 }
 }
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GoalCard from './components/goal/GoalCard'

let goal = {
    name: "Be brave",
    description: "Lorem ipsum",
    img: "http://fineartamerica.com/images/rendered/default/print/images-medium/golden-retriever-puppy-with-tongue-out-mark-taylor.jpg",
    tasks: [
        {
            id: 0,
            status: "DONE",
            name: "Become a dad",
            description: "My daughter is the best thing ever"
        },
        {
            id: 1,
            status: "NOT_DONE",
            name: "Laundry",
            description: "Do a laundry once a week"
        }, {
            id: 2,
            status: "NOT_DONE",
            name: "Run",
            description: "A simple habit that need to be fulfilled everyday"
        }],
    habits: [{
        id: 1,
        status: "IN_PROGRESS",
        name: "Read a book",
        description: "Something to complete before I die "
    }, {
        id: 3,
        status: "NOT_DONE",
        name: "Play a game"
    }]
}

const App = () =>(
    <div>
        <MuiThemeProvider>
            <GoalCard goal={goal}/>
        </MuiThemeProvider>
    </div>
)

export default App;
