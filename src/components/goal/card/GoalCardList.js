import React from 'react';

import GoalCard from './GoalCard';

import Paper from 'material-ui/Paper';

class EmptyCard extends React.Component{
    render(){
        return (
            <Paper className="empty-card goal-card" zDepth={1}>
                <p>You have no goal</p>
                </Paper>
        )
    }
}

export default class GoalCardList extends React.Component{
    render(){
        let deleteGoal = this.props.deleteGoal;
        let deleteTask = this.props.deleteTask;
        let canUpdate = this.props.canUpdate;
        let goals = this.props.goals;
        let gids = this.props.gids;
        if (gids.length === 0) {
            return <EmptyCard />
        }
        return (
        <div>
            {gids.map((gid) => {
                if (goals[gid]){ // Don't show if the goal does not exist
                    return (     
                    <div key={gid}>
                        <GoalCard goal={goals[gid]}
                            canUpdate={canUpdate}
                            deleteGoal={() => { deleteGoal(gid); } }
                            deleteTask={(tid) => { deleteTask(gid, tid) } } />
                        <br/>
                        </div>
                    )
                }
                return null;
            })}
            </div>);
    }
}

GoalCardList.propTypes = {
    goals: React.PropTypes.object.isRequired,
    gids: React.PropTypes.array.isRequired,

    deleteGoal: React.PropTypes.func,
    deleteTask: React.PropTypes.func,
    canUpdate: React.PropTypes.bool,
}