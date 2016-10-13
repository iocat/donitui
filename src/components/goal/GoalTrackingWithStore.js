// TODO instead of app with store do GoalsWithStore: get rid of these
import { connect } from 'react-redux';
import GoalTracking from '../goal/GoalTracking';
import { normalizer } from '../../reducers/utils/normalizer';
import { ActionCreators } from '../../actions/index';

function filterGoals(goals = {}, filterStatus = {}) {
    let normGoals = normalizer(goals, ActionCreators.DENORMALIZE("id"));
    normGoals.forEach((goal, i) => {
        normGoals[i].tasks = normalizer(normGoals[i].tasks, ActionCreators.DENORMALIZE("id"))
    })
    if (filterStatus.length === 0) {
        return normGoals;
    }
    return normGoals.filter(
        (goal) => {
            if (filterStatus[goal.status]){
                return true;
            }
            return false;
        })
}

function mapStateToProps(root) {
    return {
        goals: filterGoals(root.GoalTracking.Goals, root.GoalTracking.Filter.byStatuses),
        canUpdate: true,
    }
}

function mapDispatchToProps(dispatchfn){
    return{
        deleteGoal: (id) => {
            dispatchfn(ActionCreators.DELETE_GOAL(id));
        },
        deleteTaskFromGoal: (goalid, taskid) =>{
            dispatchfn(ActionCreators.DELETE_TASK(goalid,taskid));
        },
    }
}

export const GoalTrackingWithStore = connect(mapStateToProps, mapDispatchToProps)(GoalTracking);