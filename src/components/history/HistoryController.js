// @flow
import React from 'react';
import { IconMenu, IconButton, ListItem, Avatar } from 'material-ui';
import { connect } from 'react-redux';

import type { RootReducer }from '../../data/reducers';
import type { Goal, HistoryElem }from '../../data/types';
import { HistoryType } from '../../data/index';
import { formatDateAndTime }from '../../timeutils';

function getHistoryMessage(history: HistoryElem, goals: {[id: number]:Goal}): string{
    let msg: string = ""
    switch(history.type){
        case HistoryType.TASK_STARTED:
            msg =  "Task \""+ goals[history.goalId].tasks[history.torhId].name +"\" has started."
            break;
        case HistoryType.TASK_ENDED:
            msg = "Task \""+ goals[history.goalId].tasks[history.torhId].name +"\" has ended."
            break;
        case HistoryType.HABIT_STARTED:
            msg = "Habit \""+ goals[history.goalId].habits[history.torhId].name +"\" has started."
            break;
        case HistoryType.HABIT_ENDED:
            msg = "Habit \""+ goals[history.goalId].habits[history.torhId].name +"\" has paused."
            break;
        case HistoryType.GOAL_ACHIEVED:
            msg = "Goal \""+ goals[history.goalId].name +"\" has been completed."
            break;
        default:
            console.error("history is unhandled")
    }
    return msg
}

function getGoalHistoryImg(history: HistoryElem, goals: {[id:number]:Goal}): string{
    return goals[history.goalId].img
}


import HistoryIcon from 'material-ui/svg-icons/action/announcement';

// TODO: add pagination
// TODO: add "new notification" with badge
class _HistoryController extends React.Component{
    getHistoryList = ()=>{
        let historyList: any = null,
            goals: {[id:number]:Goal} = this.props.goals;
        if (this.props.histories.length === 0){
            historyList = <ListItem style={{textAlign:"center"}} secondaryText="Empty History" disabled> </ListItem>;
        }else{
            historyList = this.props.histories.map(
                (history: HistoryElem, index: number)=>
                (<ListItem key={history.at + history.type + history.goalId}
                    leftAvatar={<Avatar src={getGoalHistoryImg(history, goals)} />}
                    primaryText={getHistoryMessage(history, goals)} secondaryText={formatDateAndTime(new Date(history.at))}/>)
            )
        }
        return historyList
    }


    render(){
        let historyIcon = <IconButton tooltip={"History"}>
                            <HistoryIcon color="white"/>
                        </IconButton>
        return <IconMenu
            maxHeight={350} menuStyle={{width:"400px"}}
            iconButtonElement={historyIcon}>
            {this.getHistoryList()}
        </IconMenu>;
    }
}


const mapStateToProps = (root: RootReducer)=>{
    return {
        newHistory: true,
        goals: root.goalTracking.goals,
        histories: root.goalTracking.histories,
        now: root.goalTracking.scheduler.now,
    }
}


export default connect(mapStateToProps)(_HistoryController)
