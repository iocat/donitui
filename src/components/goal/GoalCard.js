import React from 'react';

import TaskItem from './TaskItem' ;
import HabitItem from './HabitItem';

import ImageFlare from 'material-ui/svg-icons/image/flare';
import ImageTimeLapse from 'material-ui/svg-icons/image/timelapse';
import GoalCardHeader from './GoalCardHeader'
import Divider from 'material-ui/Divider';

import {List} from 'material-ui/List';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';


export default class GoalCard extends React.Component {
    styles() {
        return {
            root: {
                position: "relative",
                maxWidth: "500px",
            }
        }
    }


    render() {
        let goal = this.props.goal
        let styles = this.styles()
        return (
            <Card style={styles.root}>
                <GoalCardHeader goal={goal}/>
                <List>
                    {
                        goal.tasks.map(function (task, index) {
                            let leftIcon = null
                            if (index === 0){
                                leftIcon = <ImageFlare/>
                            }
                            return (
                                <TaskItem
                                    leftIcon={leftIcon}
                                    insetChildren={true}
                                    key={task.id}
                                    task={task}
                                />
                            )}
                        )
                    }
                    <Divider inset={true}/>
                    {
                        goal.habits.map(function (habit, index) {
                            let leftIcon = null
                            if (index === 0){
                                leftIcon = <ImageTimeLapse/>
                            }
                            return (
                                <HabitItem
                                    leftIcon={leftIcon}
                                    insetChildren={true}
                                    key={habit.id}
                                    habit={habit}
                                />
                            )}
                        )
                    }

                </List>
            </Card>
        )
    }
}

GoalCard.defaultProps = {
    goal: {
        name: null,
        description: null,
        img: null,
        tasks: [],
        habits: []
    }
}