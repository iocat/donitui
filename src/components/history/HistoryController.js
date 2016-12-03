// @flow
import React from 'react';
import { IconMenu, IconButton, ListItem } from 'material-ui';
import { connect } from 'react-redux';


import type { $RootReducer }from '../../data/reducers';
import type {HistoryElem }from '../../data/types';
import {HistoryType} from '../../data/index';
import { formatDateAndTime }from '../../timeutils';

function getHistoryMessage(history: HistoryElem): string{
    switch(history.type){
        case HistoryType.TASK_STARTED:
            return "Task \""+ history.taskName +"\" has started."
        case HistoryType.TASK_ENDED:
            return "Task \""+ history.taskName +"\" has ended."
        case HistoryType.GOAL_ACHIEVED:
            return "Goal \""+ history.goalName +"\" has been achieved."
        default:
            console.error("history is unhandled")
    }
    return ""
}


import ActionHistory from 'material-ui/svg-icons/action/history';
const HISTORY_ICON = <ActionHistory/>

// TODO: add pagination
class _HistoryController extends React.Component{
    getHistoryList = ()=>{
        let historyList: any = null;
        if (this.props.histories.length === 0){
            historyList = <ListItem style={{textAlign:"center"}} secondaryText="Empty History" disabled> </ListItem>;
        }else{
            historyList = this.props.histories.map(
                (history: HistoryElem, index: number)=>
                (<ListItem key={history.at + history.type + history.goalId}
                    primaryText={getHistoryMessage(history)} secondaryText={formatDateAndTime(new Date(history.at))}/>)
            )
        }
        return historyList
    }

    render(){
        return <IconMenu
            maxHeight={350} menuStyle={{width:"400px"}}
            iconButtonElement={<IconButton tooltip={"History"}> {HISTORY_ICON} </IconButton>}>
            {this.getHistoryList()}
        </IconMenu>;
    }
}


const mapStateToProps = (root: $RootReducer)=>{
    return {
        histories: root.goalTracking.histories,
        now: root.goalTracking.scheduler.now,
    }
}


export default connect(mapStateToProps)(_HistoryController)
