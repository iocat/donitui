import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GoalCard from '../goal/GoalCard';

import {GoalStatus} from '../../actions/goals';

export default class GoalTracking extends React.Component {
    render(){
        return (
            <div >
            {
                this.props.goals.map((goal) => {
                    return(
                        <div key={goal.id}>
                            <MuiThemeProvider>
                                <GoalCard goal={goal} canUpdate={true} />
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
    filterStatus: [GoalStatus.DONE, GoalStatus.NOT_DONE, GoalStatus.IN_PROGRESS],
}