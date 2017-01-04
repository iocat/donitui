// @flow

import React from 'react';
import TASK_EDITOR from './goal/creator/TaskEditor';
import HABIT_EDITOR from './goal/creator/HabitEditor';
import TODO_LIST_EDITOR from './goal/creator/TodoListEditor';
import GOAL_EDITOR from './goal/creator/GoalEditor';
function TestUnit(props: any): React$Element<any>{
    return <div className="test-unit">{props.children}</div>
}

let testComps = [
    TASK_EDITOR,
    HABIT_EDITOR,
    TODO_LIST_EDITOR,
    GOAL_EDITOR
]

export default class Testing extends React.Component{
    render(){
        return <div className="test-container">
            {testComps.map(
                (testComp, index)=> <TestUnit key={index}>{testComp}</TestUnit>
            )}
        </div>
    }
}
