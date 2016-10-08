import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GoalCard from '../goal/GoalCard';

export default class MainApp extends React.Component {
    render(){
        return (
            <div >
            {
                this.props.goals.map((goal) => {
                    return(
                        <div  key={goal.id}>
                            <MuiThemeProvider>
                                <GoalCard goal={goal} />
                            </MuiThemeProvider>
                         <br/>
                        </div>)
                })
            }
        </div>)
    }
}