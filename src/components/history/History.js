// @flow

import React from 'react';
import {connect} from 'react-redux';
import { List, ListItem} from 'material-ui';
import type { $RootReducer }from '../../data/reducers';
import type {Histories, HistoryElem }from '../../data/types';
import {HistoryType} from '../../data/index';
import FloatingCard from '../utils/FloatingCard';
import { formatDateAndTime }from '../../timeutils';
import ActionHistory from 'material-ui/svg-icons/action/history';

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

class _History extends React.Component{
    props: {
        histories: Histories,
        now: number,
    }
    render(){
        let historyList: any = null;
        if (this.props.histories.length ===0){
            historyList = <p style={{textAlign:"center"}}>Empty History</p>;
        }else{
            historyList = this.props.histories.map(
                (history: HistoryElem, index: number)=>
                (<ListItem key={history.at + history.type + history.goalId}
                    primaryText={getHistoryMessage(history)} secondaryText={formatDateAndTime(new Date(history.at))}/>)
            )
        }
        return <FloatingCard iconHeader={<ActionHistory/>} iconTitle={"History"}>
        <List>
            {historyList}
        </List>
        </FloatingCard>
    }
}

const mapStateToProps = (root: $RootReducer)=>{
    return {
        histories: root.goalTracking.histories,
        now: root.goalTracking.scheduler.now,
    }
}

export default connect(mapStateToProps)(_History);
