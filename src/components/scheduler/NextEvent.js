// @flow
var React = require("react");
import {CardText} from 'material-ui';
import FloatingCard from '../utils/FloatingCard';
import {connect} from 'react-redux';
import type {Goal, Task}
from '../../data/types';
import type {Event, RootReducer}
from '../../data/reducers';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';
import {readableDuration} from '../../timeutils';

type Props = {
    nextEvent:
        ? Event,
    goal:
        ? Goal,
    task:
        ? Task,
    now: number
}

class _NextEvent extends React.Component {

    props : Props

    getDeltaTime = () : number => {
        if (this.props.nextEvent != null) {
            return this.props.nextEvent.at - this.props.now;
        }
        return 0;
    }

    render() {
        let nextEvent :?Event = this.props.nextEvent,
            task :?Task = this.props.task,
            taskNotice : string = "",
            duration : string = readableDuration(this.getDeltaTime());
        if (nextEvent != null && task != null) {
            if (nextEvent.toStart === true) {
                taskNotice = task.name + " starts in " + duration;
            } else {
                taskNotice = task.name + " ends in " + duration;
            }
        } else {
            return null;
        }
        return <FloatingCard iconHeader={<AvSkipNext/>} iconTitle={"Coming up next"}>
            <CardText>
                {taskNotice}
            </CardText>
        </FloatingCard>;
    }
}

_NextEvent.propTypes = {
    nextEvent: React.PropTypes.object,
    goal: React.PropTypes.object,
    task: React.PropTypes.object,
    now: React.PropTypes.number.isRequired
}

const mapStateToProps = (root : RootReducer) : Props => {
    if (root.goalTracking.scheduler.eventHeap.length === 0) {
        return {nextEvent: null, goal: null, task: null, now: 0}; // nothing on the event queue
    }
    let nextE = root.goalTracking.scheduler.eventHeap[0],
        goal = root.goalTracking.goals[nextE.goalId],
        task = goal.tasks[nextE.taskId],
        now = root.goalTracking.scheduler.now;

    return {nextEvent: nextE, now: now, goal: goal, task: task}
}

export default connect(mapStateToProps)(_NextEvent);
