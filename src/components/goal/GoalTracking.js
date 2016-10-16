// TODO instead of app with store do GoalsWithStore: get rid of these
import { connect } from 'react-redux';
import _GoalTracking from '../goal/_GoalTracking';
import { normalizer } from '../../reducers/utils/normalizer';
import { ActionCreators } from '../../actions/index';
import {getUserGoals, getGoalFilter} from '../../reducers/Root';
import {GoalStatus} from '../../data/index';

function filterGoals(goals = {}, filterStatus = {}) {
    let normGoals = normalizer(goals, ActionCreators.DENORMALIZE("id"));
    normGoals.forEach((goal, i) => {
        normGoals[i].tasks = normalizer(normGoals[i].tasks, ActionCreators.DENORMALIZE("id"))
    })
    
    if (Object.keys(filterStatus).length === Object.keys(GoalStatus).length){
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
        goals: filterGoals(getUserGoals(root), getGoalFilter(root).byStatuses),
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

export const GoalTracking = connect(mapStateToProps, mapDispatchToProps)(_GoalTracking);