import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GoalCard from '../goal/GoalCard';

import {GoalStatus} from '../../actions/goals';

export default class GoalTracking extends React.Component {
    render(){
        let goals = this.props.goals;
        let deleteGoal = this.props.deleteGoal;
        let deleteTask = this.props.deleteTaskFromGoal;

        return (
            <div >
            {
                goals.map((goal) => {
                    return(<div key={goal.id}>
                                <MuiThemeProvider>
                                    <GoalCard goal={goal} 
                                        canUpdate={true} 
                                        deleteGoal={()=>{deleteGoal(goal.id);}}
                                        deleteTask={(tid)=>{deleteTask(goal.id, tid)}} />
                                </MuiThemeProvider>
                            <br/>
                            </div>)
                })
            }
            </div>)
    }
}

GoalTracking.defaultProps = {
    goals: [],
    canUpdate: true,
    deleteGoal: null,
    deleteTaskFromGoal: null,
    filterStatus: [GoalStatus.DONE, GoalStatus.NOT_DONE, GoalStatus.IN_PROGRESS],
}