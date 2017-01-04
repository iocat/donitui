import React from 'react';

import HabitItem from '../card/HabitItem';
import TaskItem from '../card/TaskItem';
import EditModeTaskEditor from './EditModeTodoEditor';
import {habitIcon, taskIcon} from '../icons';

export default class PreviewTodoEditor extends React.Component{
    render() {
        let task = this.props.todo;
        let type = this.props.type;
        if (type === "task"){
            return <TaskItem
                leftIcon={taskIcon}
                onTouchTap={this.switchMode(TaskEditorState.EDITING)}
                task={task}/>;
        }else if(type === "habit") {
            return <HabitItem
                leftIcon={habitIcon}
                onTouchTap={this.switchMode(TaskEditorState.EDITING)}
                habit={task}/>;
        }
        console.error("PreviewTodoEditor needs type: task or habit");
    }
}

PreviewTodoEditor.propTypes = {
    todo: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
}
